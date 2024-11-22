############### VPC情報取得 ######################
data "aws_vpc" "main_vpc" {
  tags = {
    Name = local.vpc_name
  }
}
 
############### API向けlambdaのsecurity group情報取得 ######################
data "aws_security_group" "sg_for_api_lambda" {
  vpc_id = data.aws_vpc.main_vpc.id
  name = "SG-${local.system}-LAMBDA-API"
}

# ------------------------
# Aurora PostgreSQL
# ------------------------

module "cluster" {
  source  = "terraform-aws-modules/rds-aurora/aws"
  version = "9.0.0"

  for_each = { for cluster in local.clusters : cluster.name => cluster }

  // 共通設定
  name               = each.value.name
  engine             = each.value.engine
  engine_version     = each.value.engine_version
  instance_class     = each.value.instance_class
  availability_zones = each.value.availability_zones
  vpc_id             = data.aws_vpc.this.id
  subnets            = data.aws_subnets.this.ids
  master_username    = each.value.master_username
  master_password    = each.value.master_password
 
  # マイナーバージョンの自動更新設定
  auto_minor_version_upgrade = each.value.auto_minor_version_upgrade

  // インスタンスの作成
  instances = each.value.instances

  // サブネットグループの作成
  create_db_subnet_group = each.value.create_db_subnet_group
  db_subnet_group_name   = each.value.db_subnet_group_name

  // クラスターパラメータグループ作成
  create_db_cluster_parameter_group     = each.value.create_db_cluster_parameter_group
  db_cluster_parameter_group_family     = each.value.db_cluster_parameter_group_family
  db_cluster_parameter_group_parameters = each.value.db_cluster_parameter_group_parameters

  // DBパラメータグループ作成
  create_db_parameter_group = each.value.create_db_parameter_group
  db_parameter_group_family = each.value.db_parameter_group_family
  db_parameter_group_name   = each.value.db_parameter_group_name

  // 自動バックアップ取得
  backup_retention_period = each.value.backup_retention_period

  // データ暗号化
  storage_encrypted = each.value.storage_encrypted

  // セキュリティグループ作成
  # security_group_rules = each.value.security_group_rules
  create_security_group = each.value.create_security_group
  vpc_security_group_ids = [module.security_group_for_aurora.security_group_id]

  // ログ出力設定
  create_cloudwatch_log_group = each.value.create_cloudwatch_log_group
  enabled_cloudwatch_logs_exports = each.value.enabled_cloudwatch_logs_exports
  cloudwatch_log_group_retention_in_days = each.value.cloudwatch_log_group_retention_in_days
  
  // 削除保護
  deletion_protection = each.value.deletion_protection
  // 最終スナップショット
  skip_final_snapshot = each.value.skip_final_snapshot
  final_snapshot_identifier = each.value.final_snapshot_identifier
  
  // performance insights
  performance_insights_enabled = each.value.performance_insights_enabled
  performance_insights_retention_period = each.value.performance_insights_retention_period
  
  // 拡張モニタリング
  create_monitoring_role = each.value.create_monitoring_role
  monitoring_interval = each.value.monitoring_interval
  monitoring_role_arn = each.value.monitoring_role_arn
  
  
  // apply即時実行設定
  apply_immediately = each.value.apply_immediately
  
  depends_on = [
    module.security_group_for_aurora
  ]
  // タグ設定
  tags = {}
}

# Aurora用security groupの定義
module security_group_for_aurora {
  source = "../../modules/vpc_security_group"
  name = local.security_group_for_aurora.name
  vpc_id = data.aws_vpc.main_vpc.id
  inbound_rules = local.security_group_for_aurora.inbound_rules
  outbound_rules = local.security_group_for_aurora.outbound_rules
  tags = {
    Name = local.security_group_for_aurora.name
  }
}

// 下記はVPC設定値定義

data "aws_vpc" "this" {
  tags = {
    Name = local.vpc_name
  }
}

data "aws_subnets" "this" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.this.id]
  }
  filter {
    name = "tag:Name"
    values = [for az in local.target_azs :
      "${local.vpc_name}-${local.subnet_name}-${az}"
    ]
  }
}