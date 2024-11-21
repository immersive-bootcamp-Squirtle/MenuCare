# 環境名
locals {
  system = "MENUCARE"
}

# 証明書関連
locals {
  acms_info = [
    {
      # 対象ドメイン
      domain_name = "menu-care.com."
      # 証明書取得対象ドメイン
      acm_domain_name = "*.menu-care.com"
      # tags
      tags = {}
    }
  ]
}