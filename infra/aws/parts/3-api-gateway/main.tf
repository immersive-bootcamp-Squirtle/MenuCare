# account ID取得
data "aws_caller_identity" "identity" {}

# Lambda取得
data "aws_lambda_function" "lambda_function" {
  function_name = "LMD-${local.system}-${local.usage}"
}

# WAF取得
data "aws_wafv2_web_acl" "waf_for_api_gateway" {
  name     = "${local.system}-WAF-FOR-APIGATEWAY"
  scope    = "REGIONAL"
}

# WAF紐づけ
resource "aws_wafv2_web_acl_association" "acl-associtation_for_api_gateway_origin" {
  depends_on = [
    aws_api_gateway_stage.api_gateway_stage_origin,
  ]
  resource_arn = aws_api_gateway_stage.api_gateway_stage_origin.arn
  web_acl_arn  = data.aws_wafv2_web_acl.waf_for_api_gateway.arn
}

# IAM Role定義 (APIGateway用)
resource "aws_iam_role" "iam_role_for_api_gateway" {
  name = "RL-${local.system}-APIGW-${local.usage}"
  assume_role_policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Principal = {
            Service = "apigateway.amazonaws.com"
          }
          Action = "sts:AssumeRole"
        },
      ]
    }
  )
}

# IAM PolicyをIAM Roleにアタッチ
resource "aws_iam_role_policy_attachment" "iam_role_policy_logs_attachment" {
  role       = aws_iam_role.iam_role_for_api_gateway.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_lambda_attachment" {
  role       = aws_iam_role.iam_role_for_api_gateway.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaRole"
}

# モニタリング用IAM Roleを接続
resource "aws_api_gateway_account" "api_gateway_account" {
  count = local.main_env ? 1 : 0
  cloudwatch_role_arn = aws_iam_role.iam_role_for_api_gateway.arn
}

# Swagger読み込み
data "template_file" "swagger" {
  template = file("./resource/swagger.yml")

  vars = {
    account_id  = data.aws_caller_identity.identity.id
    lambda_uri  = replace(data.aws_lambda_function.lambda_function.invoke_arn, "//invocations$/", ":$${stageVariables.alias}/invocations")
    domain_name = local.domain_name_for_swagger
  }
}

# API Gateway構築
resource "aws_api_gateway_rest_api" "api_gateway" {
  name        = "APIGW-${local.system}-${local.usage}"
  description = local.description

  body = data.template_file.swagger.rendered

  tags = {
  }

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# API Gatewayデプロイ定義
resource "aws_api_gateway_deployment" "api_gateway_deployment" {
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_stage.api_gateway_stage_origin
  ]

  triggers = {
    redeployment = sha1(
      jsonencode(
        [
          aws_api_gateway_rest_api.api_gateway.body,
        ]
      )
    )
  }

  lifecycle {
    replace_triggered_by = [
      aws_api_gateway_rest_api.api_gateway.body,
    ]
  }

  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
}

# stage構築(origin)
resource "aws_api_gateway_stage" "api_gateway_stage_origin" {
  lifecycle {
    replace_triggered_by = [
      aws_api_gateway_deployment.api_gateway_deployment
    ]
  }
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  stage_name    = "origin"
  description   = "API Gateway origin stage"
  deployment_id = aws_api_gateway_deployment.api_gateway_deployment.id

  variables = {
    alias = "origin"
  }

  tags = {
  }
}

# API Gatewayメソッド設定定義(origin)
resource "aws_api_gateway_method_settings" "api_gateway_method_settings_origin" {
  depends_on = [
    aws_api_gateway_account.api_gateway_account,
  ]
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  stage_name  = aws_api_gateway_stage.api_gateway_stage_origin.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled        = local.metrics_enabled
    data_trace_enabled     = local.data_trace_enabled
    logging_level          = local.logging_level
    throttling_burst_limit = local.throttling_burst_limit
    throttling_rate_limit  = local.throttling_rate_limit
  }
}

# トリガ作成(origin)
resource "aws_lambda_permission" "permission_for_api_gateway_origin" {
  depends_on = [
    aws_api_gateway_stage.api_gateway_stage_origin,
  ]
  statement_id  = "AllowExecutionFromAPIGatewayOrigin"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.lambda_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*/*"
  qualifier     = "origin"
}