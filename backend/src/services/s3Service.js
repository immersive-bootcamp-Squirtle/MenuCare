const s3 = require("../../s3Config");
const { v4: uuidv4 } = require("uuid");

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// S3に直接アップロードする
exports.uploadToS3 = async (fileContent, mimeType) => {
  const uniqueKey = `images/${uuidv4()}.jpg`;
  // console.log("uniqueKey", uniqueKey)
  const params = {
    Bucket: BUCKET_NAME,
    Key: uniqueKey,
    Body: fileContent,
    ContentType: mimeType,
    // ACL: "public-read", // バケットがACL非対応のため
  };

  await s3.upload(params).promise();
  return uniqueKey;
};

// 署名付きURLを生成する（ダウンロード用）
exports.generateDownloadUrl = async (key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: 3600, // 有効期限 
  };

  const downloadUrl = await s3.getSignedUrlPromise("getObject", params);
  return downloadUrl;
};
