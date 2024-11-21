# ------------------------
# S3
# ------------------------

# Account ID取得
data "aws_caller_identity" "identity" {}

module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "4.1.0"

  for_each = { for bucket in local.buckets : bucket.name => bucket }

  bucket = each.value.name
  acl    = each.value.acl

  block_public_acls       = each.value.block_public_acls
  block_public_policy     = each.value.block_public_policy
  ignore_public_acls      = each.value.ignore_public_acls
  restrict_public_buckets = each.value.restrict_public_buckets
  force_destroy           = each.value.force_destroy

  tags       = local.tags
  versioning = each.value.versioning
  lifecycle_rule = each.value.lifecycle_rule
  replication_configuration = each.value.replication_configuration

  control_object_ownership = each.value.control_object_ownership
  object_ownership         = each.value.object_ownership

  attach_policy = each.value.attach_policy
  policy        = each.value.attach_policy ? each.value.policy : null
  cors_rule = each.value.cors_rule
  logging = each.value.logging != null ? {
    target_bucket = each.value.logging.target_bucket
    target_prefix = each.value.logging.target_prefix
  } : {}
}