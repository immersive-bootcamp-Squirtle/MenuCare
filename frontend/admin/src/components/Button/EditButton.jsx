import React from "react";
import {IconButton,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function EditButton({item,onEdit}) {
  return (
    <IconButton
    onClick={(e) => {
      onEdit(item.menu_id);
    }}
    sx={{
      position: "absolute",
      top: 8,
      right: 48,
      bgcolor: "#FFFFFFCC",
      "&:hover": { bgcolor: "#F2A24A" },
    }}
  >
    <EditIcon />
  </IconButton>
  );
}

export default EditButton;
