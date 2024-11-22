# 稼働環境
terraform {
  required_version = "~> 1.7.1"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.34.0"
    }
  }
}

# sample
# cloudfront向けACM証明書の作成
module acm_for_cloudfront {
  source = "../../modules/acm_for_cloudfront"
  for_each = {for i in local.acms_info : i.acm_domain_name => i}
  
  domain_name = each.value.domain_name
  acm_domain_name = each.value.acm_domain_name
  tags = each.value.tags
}

# 使い方
!! 余裕あるタイミングで追記!!