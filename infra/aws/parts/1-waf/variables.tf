# 環境名
locals {
  system = "MENUCARE"
}

# define locals for ip_restrict
locals {
  waf_list = [
    {
      scope = "CLOUDFRONT"
      # エラーレスポンスのステータスコードをデフォルトから変える場合の設定
      enable_custom_response = false
      custom_response_info = {}
      ip_restrict = {
        # IP制限の利用有無
        "enable" = true,
        # IPセットの名前
        "name_of_ip_restrict" = "${local.system}-IPSET-FOR-CLOUDFRONT",
        # 許可するIPアドレスのリスト
        "allowed_ip_address_list" = [
          "49.109.16.79/32",
          "111.108.27.245/32",
          "111.108.27.53/32",
          "60.116.188.10/32"
        ],
        # cloudwatchメトリクスの取得有無
        "cloudwatch_metrics_enabled" = false,
        # サンプルリクエストの有効化有無
        "sampled_requests_enabled" = false
      }
      
      # AWS WAFの名前
      name_of_waf = "${local.system}-WAF-FOR-CLOUDFRONT"
      # AWS WAFのdescription
      description_of_waf = "AWS WAF for CloudFront."
      
      # AWSマネージドルールの設定値
      aws_managed_rules = []

      # AWS WAFのタグ一覧
      tags = {}
      
      # cloudwatchメトリクスの取得有
      cloudwatch_metrics_enabled = false
      # サンプルリクエストの有効化有無
      sampled_requests_enabled = false
      # cloudwatchロググループ名
      cloudwatch_log_group_name = "aws-waf-logs-LG-MENUCARE-WAF-FOR-CLOUDFRONT"
      cloudwatch_log_group_retention_in_days = 30
    },
    {
      scope = "REGIONAL"
      # エラーレスポンスのステータスコードをデフォルトから変える場合の設定
      enable_custom_response = false
      custom_response_info = {}
      ip_restrict = {
        # IP制限の利用有無
        "enable" = true,
        # IPセットの名前
        "name_of_ip_restrict" = "${local.system}-IPSET-FOR-APIGATEWAY",
        # 許可するIPアドレスのリスト
        "allowed_ip_address_list" = [
          "49.109.16.79/32",
          "111.108.27.245/32",
          "111.108.27.53/32",
          "60.116.188.10/32"
        ],
        # cloudwatchメトリクスの取得有無
        "cloudwatch_metrics_enabled" = false,
        # サンプルリクエストの有効化有無
        "sampled_requests_enabled" = false
      }
      
      # AWS WAFの名前
      name_of_waf = "${local.system}-WAF-FOR-APIGATEWAY"
      # AWS WAFのdescription
      description_of_waf = "AWS WAF for APIGATEWAY."
      
      # AWSマネージドルールの設定値
      aws_managed_rules = []

      # AWS WAFのタグ一覧
      tags = {}
      
      # cloudwatchメトリクスの取得有
      cloudwatch_metrics_enabled = false
      # サンプルリクエストの有効化有無
      sampled_requests_enabled = false
      # cloudwatchロググループ名
      cloudwatch_log_group_name = "aws-waf-logs-LG-MENUCARE-WAF-FOR-APIGATEWAY"
      cloudwatch_log_group_retention_in_days = 30
    }
  ]
}