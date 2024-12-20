# Define AWS Provider Version
terraform {
  required_version = "~> 1.7.1"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.34.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}