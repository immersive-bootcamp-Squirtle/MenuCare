# terraform-aws-modules/terraform-aws-vpc を用いたVPC関連リソースの作成
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.5.1"
  
  # VPC定義ごとにリソース作成を行う
  for_each = {for i in local.vpc_definition_list : i.vpc_name => i }

  name = each.value.vpc_name
  cidr = each.value.vpc_cidr

  azs             = each.value.target_azs
  private_subnets = each.value.private_subnets_cidrs
  public_subnets  = each.value.public_subnets_cidrs

  enable_nat_gateway = each.value.enable_nat_gateway
  single_nat_gateway = each.value.single_nat_gateway
  one_nat_gateway_per_az = each.value.one_nat_gateway_per_az

  // フローログを有効にする
  enable_flow_log = each.value.enable_flow_log

  // フローログのオプション設定（必要に応じて変更）
  flow_log_traffic_type   = each.value.flow_log_traffic_type
  flow_log_destination_arn = aws_cloudwatch_log_group.log_group_for_vpc_flow_log.arn
  flow_log_cloudwatch_iam_role_arn = aws_iam_role.role_for_vpc_flow_log.arn
  flow_log_destination_type = each.value.flow_log_destination_type
  flow_log_file_format = each.value.flow_log_file_format
  flow_log_max_aggregation_interval = each.value.flow_log_max_aggregation_interval
  flow_log_cloudwatch_log_group_retention_in_days = each.value.flow_log_cloudwatch_log_group_retention_in_days
  flow_log_cloudwatch_log_group_kms_key_id = each.value.flow_log_cloudwatch_log_group_kms_key_id

  tags = {}
}