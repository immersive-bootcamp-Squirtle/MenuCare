resource "aws_cognito_user_pool" "pool" {
  name = local.system

  username_attributes = local.username_attributes
}