import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, CardMedia, Typography } from "@mui/material";
// import AllergyIcon from "../AllergyIcon/AllergyIcon";
// import { useDropzone } from "react-dropzone";

function UploadImage({ image, handleImageUpload }) {
  //   console.log("list_alg:", allergies);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (image && !preview) {
      setPreview(image);
    }
  }, [image]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // 変更時にプレビューを更新
      handleImageUpload(event); // 親コンポーネントにアップロード処理を通知
    }
  };

  return (
    <>
    <Typography variant="h6">商品画像</Typography>
      <Box
        sx={{
          //   border: "2px dashed #dbd6cd",
          borderRadius: "4px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
        {image ? (
          <CardMedia
            component="img"
            alt="Menu Image"
            image={preview} // プレビュー画像
            sx={{
              width: "412.5px",
              height: "245px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{ 
                color: "#a3978c", 
                border: "2px dashed #dbd6cd",
                borderRadius: "10px",
                padding:"10px"
             }}
          >
            ファイルを選択
          </Typography>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </Box>
    </>
  );
}

export default UploadImage;

