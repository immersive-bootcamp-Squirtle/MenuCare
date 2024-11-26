resource "aws_cognito_user_pool" "pool" {
  name = local.system

  alias_attributes = local.alias_attributes
  username_attributes = local.username_attributes
}