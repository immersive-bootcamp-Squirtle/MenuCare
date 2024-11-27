# 環境名
locals {
  system = "MENUCARE"
}

# frontend向け設定値
locals {
  # custom rootドメイン情報
  custom_root_domain = "menu-care.com."
  # custom ドメイン情報
  custom_domain = "admin.menu-care.com"
  # custom ドメイン情報 for ACM
  custom_domain_for_acm = "*.menu-care.com"
  # blue面用S3バケット
  s3_bucket_name_for_react = "menucare-admin-react-bucket"
  # AWS WAF名
  waf_name_for_cloudfront = "${local.system}-WAF-FOR-CLOUDFRONT"
  # connection_timeout
  connection_timeout = 10
  # 代替えドメイン名
  aliases = ["${local.custom_domain}"]
  # default_cache_behavior
  default_cache_behavior = {
    allowed_methods = ["GET", "HEAD"],
    cached_methods = ["GET", "HEAD"],
    # マネージドキャッシュポリシー : 「CachingOptimized」のchache id
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = null
    max_ttl = null
  }
  # 価格クラス
  price_class = "PriceClass_200"
  # 地理的アクセス制限
  restrictions = {
    geo_restriction = {
      restriction_type = "whitelist",
      locations = ["JP"]
    }
  }
  # ordered_cache_behavior設定
  ordered_cache_behavior = []

  # custom error response設定
  custom_error_response = [
    { 
      # 用途が分かる名前を記載
      name = "custom_error_response_for_403"
      error_caching_min_ttl = 0
      error_code = 403
      response_code = 200
      response_page_path = "/"
    }
  ]
  # viewer_certificate関連
  viewer_certificate = {
    acm_domain = "*.menu-care.com"
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  # tags
  tags = {}
}