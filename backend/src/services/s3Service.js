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

// 署名付きURLを生成する（アップロード用）
exports.generateUploadUrl = async () => {
  try{
    const uniqueKey = `images/${uuidv4()}`;
    const params = {
      Bucket: BUCKET_NAME,
      Key: uniqueKey,
      Expires: 3600, // 有効期限 
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    return {
      preSignedUrlForS3Upload : uploadUrl,
      path : uniqueKey
    };
  } catch (err) {
    console.log("error in generateUploadUrl")
    console.log(err)
  }
  
};