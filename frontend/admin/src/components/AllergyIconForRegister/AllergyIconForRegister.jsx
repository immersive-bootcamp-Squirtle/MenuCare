import React from "react";
import { Button, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function AllergyIconForRegister({ name, isSelected, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: isSelected ? "#fff" : "#000", 
        fontSize: "10px",
        textTransform: "none",
        borderRadius: "8px",
        justifyContent: "space-between", 
        padding: "5px",
        border: "none", // 枠線を非表示
        outline: "none", // フォーカス時の青い枠を非表示
        backgroundColor: isSelected ? "#F2A24A" : "#fff", // SUNSETカラー（選択時）
        ":hover": {
          backgroundColor: isSelected ? "#F2A24A" : "#f5f5f5",
        },
        ":focus": {
          outline: "none", // フォーカス時の青い枠を非表示
        },
        ":active": {
          outline: "none", // アクティブ状態の青い枠を非表示
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexGrow: 1,
        }}
      >
        {name}
      </Box>
      <CheckCircleOutlineIcon
        sx={{
          fontSize: "18px",
          color: isSelected ? "#fff" : "#a3978c", // アイコンの色
        }}
      />
    </Button>
  );
}

export default AllergyIconForRegister;
