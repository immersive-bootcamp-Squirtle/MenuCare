const AWS = require("aws-sdk");

//lambda用
AWS.config.update({
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

//Local用
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//   });

module.exports = s3;