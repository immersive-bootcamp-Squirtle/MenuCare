import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, CardMedia, Typography, Button } from "@mui/material";
// import AllergyIcon from "../AllergyIcon/AllergyIcon";
// import { useDropzone } from "react-dropzone";

function CategoryButton({
  categories,
  handleCategorySelect,
  selectedCategory,
}) {
  //   console.log("list_alg:", allergies);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category.category_id}
            variant="outlined"
            onClick={() => handleCategorySelect(category.category_id)}
            sx={{
              textTransform: "none", 
              borderRadius: "8px",
              backgroundColor:
                selectedCategory === category.category_id
                  ? "#F2A24A"
                  : "transparent", 
              borderColor:
                selectedCategory === category.category_id
                  ? "#F2A24A"
                  : "#dbd6cd",
              color:
                selectedCategory === category.category_id
                  ? "#fff"
                  : "#3c3a37",
              "&:hover": {
                backgroundColor: "#ffedcc",
                borderColor: "#ff9500",
              },
              ":focus": {
                outline: "none", // フォーカス時の青い枠を非表示
              },
              ":active": {
                outline: "none", // アクティブ状態の青い枠を非表示
              },
            }}
          >
            {category.category_name}
          </Button>
        ))}
      </Box>
    </>
  );
}

export default CategoryButton;
