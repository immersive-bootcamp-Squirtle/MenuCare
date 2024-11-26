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
  username_attributes = ["email"]
}