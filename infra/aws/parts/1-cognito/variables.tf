# リージョン指定
locals {
  region    = "us-east-1"
}

# 環境名
locals {
  system = "MENUCARE"
}

# definition of cognito user pool
locals {
  alias_attributes = ["preferred_username", "email"]
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
}