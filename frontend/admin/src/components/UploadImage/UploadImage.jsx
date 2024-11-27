import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, CardMedia, Typography } from "@mui/material";
// import AllergyIcon from "../AllergyIcon/AllergyIcon";
// import { useDropzone } from "react-dropzone";

function UploadImage({ image, handleImageUpload }) {
  //   console.log("list_alg:", allergies);
  return (
    <>
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
            image={image} // プレビュー画像
            sx={{
              width: "413px",
              height: "277px",
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
          onChange={handleImageUpload}
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
