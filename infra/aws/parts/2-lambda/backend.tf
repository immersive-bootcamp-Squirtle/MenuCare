terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key            = "2-lambda/tfstate"
    region = "us-east-1"
  }
}