# IP SETを作成
resource "aws_wafv2_ip_set" "ip_set" {
  count = var.enable_ip_restrict == true ? 1 : 0

  name = var.name_of_ip_set
  scope = var.scope
  ip_address_version = "IPV4"
  addresses = var.allowed_ip_address_list
}

# aws waf web aclsの作成
resource "aws_wafv2_web_acl" "aws_wafv2_web_acl" {
  name        = var.name_of_waf
  description = var.description_of_waf
  scope       = var.scope

  default_action {
    block {
      dynamic custom_response {
        for_each = var.enable_custom_response == true ? [1] : []
        content {
          response_code = var.custom_response_info.response_code
        }
      }
    }
  }
  
  # IP Restrictルールの定義
  dynamic rule {
    for_each = var.enable_ip_restrict == true ? [1] : []
    content {
      name = "ip_restrict"
      priority = 100
      
      action {
        allow {}
      }  
      
      statement {
        ip_set_reference_statement {
          arn = aws_wafv2_ip_set.ip_set[0].arn
        }
      }
      
      visibility_config {
        sampled_requests_enabled   = var.sampled_requests_enabled_for_ip_restrict
        metric_name                = "${var.name_of_waf}-IPSET"
        cloudwatch_metrics_enabled = var.cloudwatch_metrics_enabled_for_ip_restrict
      }
    }
  }
  
  # WebAclのタグ設定  
  tags = var.tags

  # WebAcl単位のvisibility_config設定
  visibility_config {
    cloudwatch_metrics_enabled = var.cloudwatch_metrics_enabled_for_web_acl
    metric_name                = "${var.name_of_waf}"
    sampled_requests_enabled   = var.sampled_requests_enabled_for_web_acl
  }
}