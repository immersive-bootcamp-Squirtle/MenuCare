terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key    = "2-aurora/tfstate"
    region = "us-east-1"
    dynamodb_table = "menucare-tf-backend"
  }
}