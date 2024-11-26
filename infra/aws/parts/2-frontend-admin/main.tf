##################################### Account ID取得 #########################################
data "aws_caller_identity" "identity" {} 

################# オリジンとなるS3バケットのデータ取得 #####################
# for Blue Bucket
data "aws_s3_bucket" "react_bucket" {
  bucket = local.s3_bucket_name_for_react
}

################# CloudFrontにアタッチするAWS WAFの情報 #####################
data "aws_wafv2_web_acl" "aws_waf_for_cloudfront" {
  name = local.waf_name_for_cloudfront
  scope = "CLOUDFRONT"
}

################# Route53のゾーン情報 #####################
 # 購入済み済みドメイン情報の取得
 data aws_route53_zone route53-zone {
   name         = local.custom_root_domain
   private_zone = false
 }

################# CloudFrontにアタッチするACMの情報 #####################
# Find a certificate that is issued
data "aws_acm_certificate" "acm_for_cloudfront" {
  domain   = local.custom_domain_for_acm
}

################# OACの作成 #####################
resource "aws_cloudfront_origin_access_control" "oai_for_react_bucket" {
  # OAC名
  name                              = "OAC-${local.system}-S3"
  # 説明
  description                       = "OAC for S3."
  # OACタイプ
  origin_access_control_origin_type = "s3"
  # 署名の挙動
  signing_behavior                  = "always"
  # 署名のプロトコル
  signing_protocol                  = "sigv4"
}

##################### CloudFtont Distributionの作成 #####################
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    # オリジン名
    domain_name              = data.aws_s3_bucket.react_bucket.bucket_regional_domain_name
    # OAC ID
    origin_access_control_id = aws_cloudfront_origin_access_control.oai_for_react_bucket.id
    # オリジンID 
    origin_id                = data.aws_s3_bucket.react_bucket.bucket_regional_domain_name
    # 接続タイムアウト
    connection_timeout = local.connection_timeout
  }
  # AWS WAFの指定
  web_acl_id = data.aws_wafv2_web_acl.aws_waf_for_cloudfront.arn
  # cloudfrontの有効化
  enabled             = true
  # ipv6の利用有無
  is_ipv6_enabled     = false
  # コメント
  comment             = "CloudFront for React."
  # デフォルトルートオブジェクト
  default_root_object = "index.html"
  # 代替えドメイン名
  aliases = local.aliases
  # キャッシュ設定
  default_cache_behavior {
    allowed_methods  = local.default_cache_behavior.allowed_methods
    cached_methods   = local.default_cache_behavior.cached_methods
    # オリジンID ※ 構築時はBlue面をオリジンとする
    target_origin_id = data.aws_s3_bucket.react_bucket.bucket_regional_domain_name

    # cache policyの指定
    cache_policy_id = local.default_cache_behavior.cache_policy_id
    
    viewer_protocol_policy = local.default_cache_behavior.viewer_protocol_policy
    min_ttl                = local.default_cache_behavior.min_ttl
    default_ttl            = local.default_cache_behavior.default_ttl
    max_ttl                = local.default_cache_behavior.max_ttl
  }
  
  # 追加のビヘイビア設定
  dynamic ordered_cache_behavior {
    for_each = {for i in local.ordered_cache_behavior : i.name => i}
    content {
      path_pattern     = ordered_cache_behavior.value.path_pattern
      allowed_methods  = ordered_cache_behavior.value.allowed_methods
      cached_methods   = ordered_cache_behavior.value.cached_methods
      target_origin_id = ordered_cache_behavior.value.target_origin_id
      cache_policy_id = ordered_cache_behavior.value.cache_policy_id
      min_ttl                = ordered_cache_behavior.value.min_ttl
      default_ttl            = ordered_cache_behavior.value.default_ttl
      max_ttl                = ordered_cache_behavior.value.max_ttl
      compress               = ordered_cache_behavior.value.compress
      viewer_protocol_policy = ordered_cache_behavior.value.viewer_protocol_policy
      
      function_association {
        event_type = "viewer-request"
        function_arn = resource.aws_cloudfront_function.cf_rewrite_url_function.arn
      }
    }
  }

  price_class = local.price_class

  restrictions {
    geo_restriction {
      restriction_type = local.restrictions.geo_restriction.restriction_type
      locations        = local.restrictions.geo_restriction.locations
    }
  }
  
  # custom errorレスポンス設定
  dynamic custom_error_response {
    for_each = {for i in local.custom_error_response : i.name => i}
    content {
      error_caching_min_ttl = custom_error_response.value.error_caching_min_ttl
      error_code = custom_error_response.value.error_code
      response_code = custom_error_response.value.response_code
      response_page_path = custom_error_response.value.response_page_path
    }
  }

  tags = local.tags
  
  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = data.aws_acm_certificate.acm_for_cloudfront.arn
    ssl_support_method             = local.viewer_certificate.ssl_support_method
    minimum_protocol_version       = local.viewer_certificate.minimum_protocol_version
  }
  
  lifecycle {
    ignore_changes = [
      origin,
      default_cache_behavior,
      ordered_cache_behavior
    ]
  }
}

##################### OAIの設定実施 #####################
resource "aws_s3_bucket_policy" "oac_policy_for_react_blue_bucket" {
  bucket = local.s3_bucket_name_for_react
  policy = templatefile("./resources/BucketPolicyForOAC.json",
            {
              bucket_name = local.s3_bucket_name_for_react,
              account_id = data.aws_caller_identity.identity.account_id
            }
          )
}
##################### DNSレコード設定 for customドメイン #####################
resource "aws_route53_record" "record_for_cloudfront_react" {
  zone_id = data.aws_route53_zone.route53-zone.zone_id
  name    = local.custom_domain
  type    = "A"

  alias {
    name                   = resource.aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = resource.aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}