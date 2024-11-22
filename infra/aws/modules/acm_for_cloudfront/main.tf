# 購入済みドメイン情報の取得
data aws_route53_zone route53-zone {
  name         = var.domain_name
  private_zone = false
}

# ACM証明書リクエスト
resource aws_acm_certificate cert {
  domain_name       = var.acm_domain_name
  validation_method = "DNS"
  tags = var.tags
}

# acm検証
resource aws_route53_record cert_validation {
  zone_id = data.aws_route53_zone.route53-zone.zone_id
  name    = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_value]
  ttl     = 60
}

# acm証明書とroute53検証用レコードの関連付け
resource aws_acm_certificate_validation cert {
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}