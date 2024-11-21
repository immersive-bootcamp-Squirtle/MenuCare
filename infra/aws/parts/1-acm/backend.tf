terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key    = "0-acm/tfstate"
    region = "us-east-1"
  }
}