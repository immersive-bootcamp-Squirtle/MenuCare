# security groupの作成
resource "aws_security_group" "default" {
  # security group名
  name = var.name
  # security groupが所属するvpcのid
  vpc_id = var.vpc_id
  # tags
  tags = var.tags
}

# inbound ruleの定義
resource "aws_security_group_rule" "ingress" {
  for_each = {for i in var.inbound_rules : i.description => i}
  # 説明
  description = each.value.description
  # rule type
  type = "ingress"
  # port範囲 (from)
  from_port = each.value.from_port
  # port範囲 (to)
  to_port = each.value.to_port
  # protocol
  protocol = each.value.protocol
  # ルールアタッチ対象であるsecurity groupのid
  security_group_id = aws_security_group.default.id
  # 接続元のcidr ipv4 ※ source_security_gorup_id,selfとの併用不可
  cidr_blocks = each.value.cidr_blocks
  # 接続元のcidr ipv6 ※ source_security_gorup_id,self との併用不可
  ipv6_cidr_blocks = each.value.ipv6_cidr_blocks
  # prefix_list_ids
  prefix_list_ids = each.value.prefix_list_ids
  # self ※ source_security_gorup_idと, cidr_blocks, ipv6_cidr_blocksの併用不可
  self = each.value.self
  # 接続元のsecurity group ※ cidr_blocks, self との併用不可
  source_security_group_id = each.value.source_security_gorup_id
}

# outbound ruleの定義
resource "aws_security_group_rule" "outbound" {
  for_each = {for i in var.outbound_rules : i.description => i}
  # 説明
  description = each.value.description
  # rule type
  type = "egress"
  # port範囲 (from)
  from_port = each.value.from_port
  # port範囲 (to)
  to_port = each.value.to_port
  # protocol
  protocol = each.value.protocol
  # ルールアタッチ対象であるsecurity groupのid
  security_group_id = aws_security_group.default.id
  # 接続元のcidr ipv4 ※ source_security_gorup_id,selfとの併用不可
  cidr_blocks = each.value.cidr_blocks
  # 接続元のcidr ipv6 ※ source_security_gorup_id,self との併用不可
  ipv6_cidr_blocks = each.value.ipv6_cidr_blocks
  # prefix_list_ids
  prefix_list_ids = each.value.prefix_list_ids
  # self ※ source_security_gorup_idと, cidr_blocks, ipv6_cidr_blocksの併用不可
  self = each.value.self
  # 接続元のsecurity group ※ cidr_blocks, self との併用不可
  source_security_group_id = each.value.source_security_gorup_id
}