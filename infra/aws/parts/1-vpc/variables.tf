# 環境名
locals {
  system = "MENUCARE"
}

# VPC定義
locals {
    vpc_definition_list = [
        {
            # VPC名
            "vpc_name" = "MENUCARE-VPC",
            # VPC CIDR
            "vpc_cidr" =  "192.168.224.0/21",
            # 対象AZ
            "target_azs" = ["use1-az1", "use1-az2", "use1-az3"],
            # private subnets cidrs
            "private_subnets_cidrs" =  ["192.168.224.0/25", "192.168.224.128/25", "192.168.225.0/25"],
            # public subnets cidrs
            "public_subnets_cidrs" = ["192.168.225.128/26", "192.168.225.192/26", "192.168.226.0/26"],
            # Nat Gatewayの作成有無
            "enable_nat_gateway" = true,
            # Nat Gatewayを一つのみ作成するか否か ※ Trueの場合、「one_nat__gateway_per_azはfalseにする必要あり」
            "single_nat_gateway" = false,
            # azごとに1つづず、Nat Gateawyを作成するか否か
            "one_nat_gateway_per_az" = true
        }
    ]
} 