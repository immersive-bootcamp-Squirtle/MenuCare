# terraform-aws-modules/terraform-aws-vpc を用いたVPC関連リソースの作成
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.5.1"
  
  # VPC定義ごとにリソース作成を行う
  for_each = {for i in local.vpc_definition_list : i.vpc_name => i }

  name = each.value.vpc_name
  cidr = each.value.vpc_cidr

  azs             = each.value.target_azs
  private_subnets = each.value.private_subnets_cidrs
  public_subnets  = each.value.public_subnets_cidrs

  enable_nat_gateway = each.value.enable_nat_gateway
  single_nat_gateway = each.value.single_nat_gateway
  one_nat_gateway_per_az = each.value.one_nat_gateway_per_az

  tags = {}
}