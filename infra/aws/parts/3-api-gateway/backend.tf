terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key            = "3-api-gateway/tfstate"
    region = "us-east-1"
  }
}