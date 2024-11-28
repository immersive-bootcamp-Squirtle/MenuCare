import React from "react";
import {IconButton, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteButton({ handleDeleteClick}) {
  return (
    <IconButton
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      bgcolor: "#FFFFFFCC",
      "&:hover": { bgcolor: "#F2A24A" },
    }}
    onClick={handleDeleteClick}
  >
    <DeleteIcon />
  </IconButton>
  );
}

export default DeleteButton;
