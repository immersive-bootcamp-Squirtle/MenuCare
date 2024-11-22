locals {
  # 環境名
  system       = "MENUCARE"

  # 用途名
  usage       = "API"
  
  # ドメイン名
  domain_name_for_swagger = "www.menu-care.com"
  }
  
locals {
  # 各AWSアカウント内における代表の1面でのみtrueとする
  main_env = true
  
  # API Gateway定義
  description = "API Gateway for API"

  retention_in_days = 400

  http_method   = "ANY"
  authorization = "NONE"
  
  path_part   = "v1"

  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  passthrough_behavior    = "WHEN_NO_MATCH"

  metrics_enabled        = true
  data_trace_enabled     = true
  logging_level          = "ERROR"
  throttling_burst_limit = 6
  throttling_rate_limit  = 6
}