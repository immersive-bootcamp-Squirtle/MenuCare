# security group id
output "security_group_id" {
    value = aws_security_group.default.id
}