# ------------------------
# Aurora PostgreSQL
# ------------------------

# 環境名
locals {
  system   = "MENUCARE"
}

locals {
  // VPCの設定値を使用（VPCの設定に応じて変更が必要）
  vpc_name   = "MENUCARE-VPC"
  target_azs = ["use1-az1", "use1-az2", "use1-az3"]
  // privateサブネットとして固定値設定
  subnet_name = "private"
  
  # security_group_name
  security_group_for_aurora = {
    name = "SG-${local.system}-aurora"
    # inbound_rules = []
    inbound_rules = [
      {
        description = "Allow DB access from api lambda"
        from_port = 5432
        to_port = 5432
        protocol = "tcp"
        cidr_blocks = null
        ipv6_cidr_blocks = null
        prefix_list_ids = null
        self = null
        source_security_gorup_id = data.aws_security_group.sg_for_api_lambda.id
      }    
    ]
    outbound_rules = [
      {
        description = "Allow all outbound traffic"
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
        ipv6_cidr_blocks = null
        prefix_list_ids = null
        self = null
        source_security_gorup_id = null
      }    
    ]
  }

  clusters = [
    {
      // 共通設定
      name               = "menucare-aurora-db-postgresql"
      engine             = "aurora-postgresql"
      engine_version     = "15.4"
      instance_class     = "db.r6g.large"
      availability_zones = ["use1-az1", "use1-az2", "use1-az3"]
      master_username    = "administrator"
      master_password    = "temp_password"
      auto_minor_version_upgrade = false

      // インスタンスの作成
      instances = {
        1 = {
          instance_class    = "db.r6g.medium"
          availability_zone = "us-east-1"
        }
      }

      // サブネットグループの作成      
      create_db_subnet_group = true
      db_subnet_group_name   = "menucare-db-subnet-group"

      // クラスターパラメータグループ作成
      create_db_cluster_parameter_group = true
      db_cluster_parameter_group_family = "aurora-postgresql15"
      db_cluster_parameter_group_parameters = [
        {
          "name" : "statement_timeout",
          "value" : 300000,
          "apply_method" : "immediate"
        },
        {
          "name" : "client_encoding",
          "value" : "UTF8",
          "apply_method" : "pending-reboot"
        },
      ]

      // DBパラメータグループ作成
      create_db_parameter_group = true
      db_parameter_group_family = "aurora-postgresql15"
      db_parameter_group_name   = "menucare-aurora-postgresql"

      // 自動バックアップ取得
      backup_retention_period = 2

      // データ暗号化
      storage_encrypted = true

      // セキュリティグループ作成
      create_security_group = false

      // ログ出力設定
      create_cloudwatch_log_group = true
      enabled_cloudwatch_logs_exports = ["postgresql"]
      cloudwatch_log_group_retention_in_days = 30
      
      // performance_insights
      performance_insights_enabled = false
      performance_insights_retention_period = 1
      
      // 拡張モニタリング
      create_monitoring_role = false
      monitoring_interval = 60
      monitoring_role_arn = null
      
      // DB情報
      DATABASE_NAME = "postgres"
      DATABASE_SCHEMA = "menucare-schema"

      # auroraコネクション情報
      DATABASE_CONNECTION_LIMIT = 1
      
      // 削除保護
      deletion_protection = true
      // 最終スナップショット作成
      skip_final_snapshot = false
      final_snapshot_identifier = "final-snapshot-menucare-aurora-db-postgresql"
      // apply即時実行設定
      apply_immediately = false
    }
  ]
}