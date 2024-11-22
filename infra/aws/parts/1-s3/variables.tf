# リージョン指定
locals {
  region    = "us-east-1"
}

# bucket name
locals {
  buckets = [
    { //React用
      name                    = "menucare-react-bucket"
      acl                     = null
      block_public_acls       = true
      block_public_policy     = true
      ignore_public_acls      = true
      restrict_public_buckets = true
      force_destroy           = false
      versioning = {
        enabled = true
      }
      lifecycle_rule = []
      replication_configuration= {}
      control_object_ownership = false
      object_ownership         = null
      attach_policy            = false
      cors_rule = []
    },
  ]
  tags = {
  }
}