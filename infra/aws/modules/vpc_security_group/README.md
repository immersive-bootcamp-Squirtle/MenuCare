# 稼働環境
terraform {
  required_version = "~> 1.7.1"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.34.0"
    }
  }
}

# sample
module security_group_for_redis {
  source = "../../modules/vpc_security_group"
  for_each = {for i in local.inbound_rules : i.description => i}
  name = "SG-${local.system}-${local.env}-redis"
  vpc_id = data.aws_vpc.main_vpc.id
  inbound_rules = [
    {
      description = "from test cidr"
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_blocks = ["172.20.0.0/32"]
      ipv6_cidr_blocks = null
      prefix_list_ids = null
      self = null
      source_security_gorup_id = null
    },
    {
      description = "from test sg"
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_blocks = null
      ipv6_cidr_blocks = null
      prefix_list_ids = null
      self = null
      source_security_gorup_id = "sg-00a1e4b628f41774a"
    }
  ]
  outbound_rules = [
    {
      description = "to test cidr"
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_blocks = ["172.20.0.0/32"]
      ipv6_cidr_blocks = null
      prefix_list_ids = null
      self = null
      source_security_gorup_id = null
    },
    {
      description = "to test sg"
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_blocks = null
      ipv6_cidr_blocks = null
      prefix_list_ids = null
      self = null
      source_security_gorup_id = "sg-00a1e4b628f41774a"
    }
  ]
  tags = {
    Environment = local.env_name
  }
}

# 使い方
!! 余裕あるタイミングで追記!!