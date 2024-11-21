# create aws waf for cloudfront
module aws_waf_for_cloudfront {
  source = "../../modules/waf"
  for_each = {for i in local.waf_list : i.name_of_waf => i}

  # scopeの設定
  scope = each.value.scope
  
  # custom error responseの設定有無
  enable_custom_response = each.value.enable_custom_response
  custom_response_info = each.value.custom_response_info
  # IP制限の有無 (true or false)
  enable_ip_restrict = each.value.ip_restrict.enable
  # IP SETの名前
  name_of_ip_set = each.value.ip_restrict.name_of_ip_restrict
  # 許可するIPアドレスのリスト
  allowed_ip_address_list = each.value.ip_restrict.allowed_ip_address_list
  # AWS WAFの名前
  name_of_waf = each.value.name_of_waf
  # web aclのdescription
  description_of_waf = each.value.description_of_waf
  # IP制限ルールのvisibility_config設定
  sampled_requests_enabled_for_ip_restrict = each.value.ip_restrict.sampled_requests_enabled
  cloudwatch_metrics_enabled_for_ip_restrict = each.value.ip_restrict.cloudwatch_metrics_enabled
  # 各種AWS Maneged Rulesの設定
  aws_managed_rules = each.value.aws_managed_rules
  # タグ
  tags =each.value.tags
  # webacl全体のvisibility_config設定
  sampled_requests_enabled_for_web_acl = each.value.cloudwatch_metrics_enabled
  cloudwatch_metrics_enabled_for_web_acl = each.value.sampled_requests_enabled  
}