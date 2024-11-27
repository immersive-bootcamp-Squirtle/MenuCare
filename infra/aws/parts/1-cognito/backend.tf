terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key    = "1-cognito/tfstate"
    region = "us-east-1"
  }
}