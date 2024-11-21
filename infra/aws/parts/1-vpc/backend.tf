terraform {
  backend "s3" {
    bucket = "menucare-tf-backend"
    key    = "1-vpc/tfstate"
    region = "us-east-1"
  }
}