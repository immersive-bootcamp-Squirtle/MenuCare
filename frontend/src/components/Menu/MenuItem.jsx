import React, { useEffect, useState } from "react";
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
import sampleImage from "../../assets/image.png";

const MenuItem = ({ item }) => {
  const price = Math.trunc(item.price);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <Box 
    sx={{ position: "relative", marginBottom: expanded ? 4 : 2 }}
    >
      <Card
        sx={{
          maxWidth: 300,
          borderRadius: 3,
          overflow: "hidden",
          textAlign: "left",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          alt={item.name}
          height="140"
          image={sampleImage}
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">¥{price}円</Typography>
        </CardContent>
        <Box sx={{ textAlign: "left", p: 1, mt: -2 }}>
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
        </Box>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{
            position: "absolute",
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
            <Typography variant="body1">
              {item.allergies ? `${item.allergies}` : "アレルギー情報なし"}
            </Typography>
            <Typography variant="body2">最終更新日：2024/11/20</Typography>
          </CardContent>
        </Collapse>
      </Card>
      </Box>
    </>
  );
};

export default MenuItem;
