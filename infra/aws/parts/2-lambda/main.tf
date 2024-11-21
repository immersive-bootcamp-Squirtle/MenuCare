# Account ID取得
data "aws_caller_identity" "identity" {}

# IAM Policy構築
resource "aws_iam_policy" "iam_policy_for_lambda_function" {
  for_each = { for i in local.usage_list : i.usage => i }
  name   = "PL-${local.system}-LAMBDA-${each.value.usage}"
  path   = "/"
  policy = templatefile("./resource/pl-${lower(local.system)}-lambda-${lower(each.value.usage)}.json",
    {
      account_id = data.aws_caller_identity.identity.account_id
    }
  )
}

# IAM Role定義 (lambda_function用)
resource "aws_iam_role" "iam_role_for_lambda_function" {
  for_each = { for i in local.usage_list : i.usage => i }
  name = "RL-${local.system}-LAMBDA-${each.value.usage}"
  assume_role_policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
          Action = "sts:AssumeRole",
          Sid    = ""
        },
      ]
    }
  )
}

# IAM PolicyをIAM Roleにアタッチ
resource "aws_iam_role_policy_attachment" "policy_attach_to_role" {
  depends_on = [
    aws_iam_role.iam_role_for_lambda_function,
    aws_iam_policy.iam_policy_for_lambda_function,
  ]
  for_each = { for i in local.iam_list : i.key => i }
  role       = each.value.role
  policy_arn = each.value.policy_arn
}

# VPC取得
data "aws_vpc" "main_vpc" {
  tags = {
    Name = local.vpc_name
  }
}

# subnet id取得
data "aws_subnets" "private_subnets" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.main_vpc.id]
  }
  filter {
    name = "tag:Name"
    values = [for az in local.target_azs :
      "${local.vpc_name}-${local.subnet_name}-${az}"
    ]
  }
}

# security group取得
# data "aws_security_group" "security_group_for_aurora" {
#   name = "SG-${local.system}-aurora"
# }

# security group構築
module security_group_for_lambda_function {
  source = "../../modules/vpc_security_group"
  
  for_each = { for i in local.security_group_definition : i.sg_name => i }
  name = each.value.sg_name
  vpc_id = data.aws_vpc.main_vpc.id
  inbound_rules = each.value.inbound_rules
  outbound_rules = each.value.outbound_rules
  tags = {
    Name = "SG-${local.system}-LAMBDA-${each.value.usage}"
  }
}

# Lambda Function構築
module "lambda_function" {
  
  source  = "terraform-aws-modules/lambda/aws"
  version = "7.2.1"

  # 環境定義ごとにリソース作成を実施
  for_each = { for i in local.lambda_function_definition_list : i.sg_name => i }

  function_name          = each.value.function_name
  description            = each.value.description
  handler                = each.value.handler
  runtime                = each.value.runtime
  memory_size            = each.value.memory_size
  ephemeral_storage_size = each.value.ephemeral_storage_size
  timeout                = each.value.timeout
  publish                           = each.value.publish
  source_path                       = each.value.source_path
  package_type                      = each.value.package_type
  use_existing_cloudwatch_log_group = each.value.use_existing_cloudwatch_log_group
  attach_cloudwatch_logs_policy     = each.value.attach_cloudwatch_logs_policy
  attach_network_policy      = each.value.attach_network_policy
  vpc_subnet_ids             = data.aws_subnets.private_subnets.ids
  create_lambda_function_url = false
  environment_variables =  each.value.environment.variables
  ignore_source_code_hash = true

  # VPCの設定取得
  vpc_security_group_ids = [module.security_group_for_lambda_function[each.key].security_group_id]

  # IAM Roleの適用
  policy_name = each.value.policy_name
  role_name = each.value.role_name
  lambda_role = each.value.lambda_role

  # 自作policyの追加
  number_of_policies = each.value.number_of_policies
  attach_policies = each.value.attach_policies
  policies = each.value.policies
  
  # リソースベースのポリシー
  allowed_triggers = {}
  
  # layers
  layers = each.value.layers

  # tag
  tags = {
  }
}