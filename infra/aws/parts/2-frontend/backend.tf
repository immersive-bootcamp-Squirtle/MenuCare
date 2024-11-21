terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key    = "2-frontend/tfstate"
    region = "us-east-1"
  }
}