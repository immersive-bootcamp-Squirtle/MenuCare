locals {
  # 環境名
  system       = "MENUCARE"

  # 用途名
  usage_list = [
    {
      "usage"       = "API"
    }
  ]
}

locals {
  iam_list = [
    {
      key = "RL-${local.system}-LAMBDA-API"
      role = "RL-${local.system}-LAMBDA-API"
      policy_arn = "arn:aws:iam::${data.aws_caller_identity.identity.account_id}:policy/PL-${local.system}-LAMBDA-API"
    }
  ]
}

locals {
  security_group_definition = [
    {
      sg_name = "SG-${local.system}-LAMBDA-API"
      usage = "API"
      inbound_rules = [
        {
          description = "to apigateway port 443 for https"
          from_port = 443
          to_port = 443
          protocol = "tcp"
          cidr_blocks = [data.aws_vpc.main_vpc.cidr_block]
          ipv6_cidr_blocks = null
          prefix_list_ids = null
          self = null
          source_security_gorup_id = null
        }
      ]
      outbound_rules = [
        {
          description = "to aurora port 5432 for tls"
          from_port = 5432
          to_port = 5432
          protocol = "tcp"
          cidr_blocks = null
          ipv6_cidr_blocks = null
          prefix_list_ids = null
          self = null
          source_security_gorup_id = data.aws_security_group.security_group_for_aurora.id
        },
        {
          description = "to external api"
          from_port = 443
          to_port = 443
          protocol = "tcp"
          cidr_blocks = "0.0.0.0/0"
          ipv6_cidr_blocks = null
          prefix_list_ids = null
          self = null
          source_security_gorup_id = null
        }
      ]
    },
  ]
}

locals {
  # VPC名
  vpc_name = "MENUCARE-VPC"

  # subnet定義
  target_azs  = ["use1-az1", "use1-az2", "use1-az3"]
  subnet_name = "private"

  # log出力設定
  enable_lambda_log = true
  
  # log保持設定
  retention_in_days = 400

  # Lambda Function定義
  lambda_function_definition_list = [
    {
      # 用途
      "usage"       = "API"
      # キー値
      "sg_name" = "SG-${local.system}-LAMBDA-API",
      # function name
      "function_name" = "LMD-${local.system}-API",
      # description
      "description" = "Lambda Function for API",
      # handler
      "handler" = "lambda.handler",
      # runtime
      "runtime" = "nodejs20.x",
      # メモリサイズ
      "memory_size" = 512,
      # エフェメラルストレージサイズ
      "ephemeral_storage_size" = 2048,
      # タイムアウト
      "timeout" = 28,
      # retry回数
      "maximum_retry_attempts" = 2,
      # provisioned concurrency
      "num_of_provisioned_concurrency" = -1
      # 新しいバージョンとして更改するか
      "publish" = "true",
      # ソースコードのパス（要確認）
      "source_path" = "./source/node",
      # デプロイパッケージのタイプ
      "package_type" = "Zip",
      # 既存logグループを使用するか
      "use_existing_cloudwatch_log_group" = false
      # CloudWatchポリシー
      "attach_cloudwatch_logs_policy" = true
      # VPC・ネットワークポリシー
      "attach_network_policy" = true,
      # ポリシー名
      "policy_name" = "PL-${local.system}-LAMBDA-API",
      # policy関連
      number_of_policies = 1
      attach_policies = true,
      policies = [
        resource.aws_iam_policy.iam_policy_for_lambda_function["API"].arn,
      ],
      # attachするpolicyのリスト
      # ログ用ロール名
      "role_name" = "RL-${local.system}-LAMBDA-API-LOG",
      # ロール名
      "lambda_role" = "arn:aws:iam::${data.aws_caller_identity.identity.account_id}:role/RL-${local.system}-LAMBDA-API",
      # layers
      layers = [],
      # 環境変数
      environment = {
        variables = {
          DB_HOST = "dummy",
          DB_NAME = "dummy",
          DB_USER = "dummy",
          DB_PASSWORD = "dummy"
        }
      }
    }
  ]
}