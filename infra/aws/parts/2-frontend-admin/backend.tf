terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key    = "2-frontend-admin/tfstate"
    region = "us-east-1"
  }
}