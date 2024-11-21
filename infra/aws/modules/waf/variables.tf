# IP制限の有無 (true or false)
variable "enable_ip_restrict" {}
# IP SETのスコープ名前
variable "scope" {}
# IP SETの名前
variable "name_of_ip_set" {}
# 許可するIPアドレスのリスト
variable "allowed_ip_address_list" {}
# AWS WAFの名前
variable "name_of_waf" {}
# custom_responseの有効化有無
variable "enable_custom_response" {}
variable "custom_response_info" {}
# web aclのdescription
variable "description_of_waf" {}
# IP制限ルールのvisibility_config設定
variable "sampled_requests_enabled_for_ip_restrict" {}
variable "cloudwatch_metrics_enabled_for_ip_restrict" {}
# 各種AWS Maneged Rulesの設定
variable "aws_managed_rules" {}
# タグ
variable "tags" {}
# webacl全体のvisibility_config設定
variable "sampled_requests_enabled_for_web_acl" {}
variable "cloudwatch_metrics_enabled_for_web_acl" {}
