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

const MenuItem = ({ item, onClick }) => {
  const price = Math.trunc(item.price);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (event) => {
    event.stopPropagation(); // アイテムのクリックイベントを区別
    setExpanded(!expanded);
  };

  // console.log("image_in_menuitem:",item.image_url)
  const updated_date = new Date(item.updated_at).toLocaleDateString("ja-JP");

  return (
    <>
      <Box sx={{ position: "relative", marginBottom: expanded ? 4 : 2 }}>
        <Card
          onClick={() => onClick(item)}
          sx={{
            maxWidth: 286,
            borderRadius: 3,
            overflow: "hidden",
            textAlign: "left",
            height: "auto",
          }}
        >
          <CardMedia
            component="img"
            alt={item.name}
            height="140"
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
                fontSize: "clamp(16px, calc(1rem - 0.1vw), 24px)",
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
                fontSize: "clamp(0.75rem, 0.614rem + 0.68vw, 1.125rem)",
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
              //   position: "absolute",
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
                  fontSize: "18px",
                }}
              >
                {item.allergies && item.allergies.length > 0
                  ? item.allergies.join(", ") // リストの要素をカンマ区切りで表示
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
                (最終更新日:{updated_date})
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </>
  );
};

export default MenuItem;
