// user poolを作成
resource "aws_cognito_user_pool" "pool" {
  name = local.system

  alias_attributes = local.alias_attributes
}

// application clientを作成
resource "aws_cognito_user_pool_client" "client" {
  name = local.system

  user_pool_id = resource.aws_cognito_user_pool.pool.id
  explicit_auth_flows = local.explicit_auth_flows
}