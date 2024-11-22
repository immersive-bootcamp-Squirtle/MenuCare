terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key    = "1-s3/tfstate"
    region = "us-east-1"
  }
}