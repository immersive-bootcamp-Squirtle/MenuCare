import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import DeleteButton from "../Button/DeleteButton";
import DeleteConfirm from "../Dialog/DeleteConfirm";
import EditButton from "../Button/EditButton";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const MenuItem = ({ item, onDelete, onEdit }) => {
  const price = Math.trunc(item.price);
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("item.menu_id", item.menu_id);
      await axios.delete(`${baseUrl}/restaurants/1/menus/${item.menu_id}`);
      onDelete(item.menu_id);
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete menu:", err);
      alert("削除に失敗しました");
    }
  };

  return (
    <>
      <Box sx={{ position: "relative", marginBottom: expanded ? 4 : 2 }}>
        <Card
          sx={{
            maxWidth: 286,
            borderRadius: 3,
            overflow: "hidden",
            textAlign: "left",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            alt={item.name}
            height="193"
            image={item.image_url}
            sx={{
              objectFit: "cover",
            }}
          />
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: "#3c3a37",
                fontSize: "clamp(16px, 4vw, 20px)",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#756e68",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(15px, 3vw, 18px)",
              }}
            >
              ¥{price}
            </Typography>
          </CardContent>
          <Box sx={{ textAlign: "left", p: 1, mt: -2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#756e68",
                paddingLeft: "5px",
                fontSize: "15px",
              }}
            >
              アレルギー情報
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Typography>
          </Box>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{
              position: "relative",
              width: "100%",
              zIndex: 1,
            }}
          >
            <CardContent
              sx={{
                bgcolor: "#f5f5f5",
                borderTop: "1px solid #ddd",
                borderRadius: 3,
              }}
            >
              <Typography
                sx={{
                  color: "#3c3a37",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: "clamp(15px, 3vw, 18px)",
                }}
              >
                {item.allergies && item.allergies.length > 0
                  ? item.allergies.join(", ") 
                  : "アレルギー情報なし"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#3c3a37",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: "12px",
                }}
              >
                (最終更新日:2024/11/20)
              </Typography>
            </CardContent>
          </Collapse>

          {/* 編集ボタン */}
          <EditButton item={item} onEdit={onEdit}/>

          {/* 削除ボタン */}
          <DeleteButton handleDeleteClick={handleDeleteClick} />
        </Card>
      </Box>

      {/* 削除確認ダイアログ */}
      <DeleteConfirm
        item={item}
        dialogOpen={dialogOpen}
        handleConfirmDelete={handleConfirmDelete}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default MenuItem;
