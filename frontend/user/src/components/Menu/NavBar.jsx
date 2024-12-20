import React, { useState } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History"; // 履歴アイコンをインポート
import IconButton from "@mui/material/IconButton";

const NavBar = ({ openModal, cartItemCount, onCategoryChange }) => {
  const navigate = useNavigate();
  // openModalを受け取る
  const categoryButtons = [
    { id: 1, label: "すべて" },
    { id: 2, label: "前菜" },
    { id: 3, label: "メイン" },
    { id: 4, label: "デザート" },
    { id: 5, label: "飲み物" },
  ];

  const filterButtons = [
    { id: 4, label: "アレルギーあり" },
    { id: 5, label: "食事制限あり" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const selectedStyle = {
    padding: "0.6em 1.2em",
    fontSize: "clamp(14px, 2vw, 18px)",
    color: "#fff",
    background: "linear-gradient(90deg, #f2994a, #f2c94c)",
    border: "0.15em solid #f2ede5",
    borderRadius: "2em",
    cursor: "pointer",
    fontWeight: 700,
    fontFamily: "'Noto Sans JP', sans-serif",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    },
    "@media (maxWidth: 768px)": {
      fontSize: "16px",
      padding: "10px 20px",
    },
  };

  const unselectedStyle = {
    padding: "0.6em 1.2em",
    fontSize: "clamp(14px, 2vw, 18px)",
    color: "#dbd6cd",
    background: "#fff",
    border: "0.15em solid #dbd6cd",
    borderRadius: "2em",
    cursor: "pointer",
    fontWeight: 700,
    fontFamily: "'Noto Sans JP', sans-serif",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    },
    "@media (maxWidth: 768px)": {
      fontSize: "16px",
      padding: "10px 20px",
    },
  };

  const handleCategoryClick = (label) => {
    setSelectedCategory(label);
    if (onCategoryChange) {
      onCategoryChange(label); // 親コンポーネントへ通知
    }
  };

  const handleFilterClick = (id) => {
    if (id === 4) {
      openModal(); // アレルギーボタンをクリックしたときにモーダルを開きたい
    } else {
      setSelectedFilters((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((filterId) => filterId !== id)
          : [...prevSelected, id]
      );
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#f2ede5",
          height: "clamp(10.625rem, 9.716rem + 4.55vw, 13.125rem)",
          zIndex: 900,
        }}
      >
        <Box
          sx={{
            height: "clamp(5px, 4vh, 10px)", // 上部スペースを調整
            backgroundColor: "#f2ede5",
          }}
        />
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ width: "33%", visibility: "hidden" }}>
            {/* 左側のダミーアイコン */}
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton>
              <HistoryIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            sx={{
              flexGrow: 1,
              color: "#3c3a37",
              fontSize: "clamp(18px, 4vw, 28px)",
              textAlign: "center",
            }}
          >
            メニュー一覧
          </Typography>
          <Box
            sx={{ width: "33%", display: "flex", justifyContent: "flex-end" }}
          >
            {/* カートアイコン */}
            <CartButton onClick={() => navigate("/cart")}>
              <ShoppingCartIcon />
              {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
            </CartButton>
            {/* 履歴アイコン */}
            <HistoryButton onClick={() => navigate("/order-history")}>
              <HistoryIcon />
            </HistoryButton>
          </Box>
        </Toolbar>
        <Container>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              overflowX: "auto", // 横スクロール
              whiteSpace: "nowrap", // 折り返し無効
              "-webkit-overflow-scrolling": "touch", // スムーズにスクロール
              scrollbarWidth: "none", // Firefoxでスクロールバーを非表示
              "&::-webkit-scrollbar": {
                display: "none", // Chrome/Safariでスクロールバーを非表示
              },
            }}
          >
            {categoryButtons.map((button) => (
              <button
                key={button.id}
                style={{
                  width: "clamp(5.625rem, 4.943rem + 3.41vw, 7.5rem)",
                  height: "clamp(2.5rem, 2.159rem + 1.7vw, 3.438rem)",
                  flexShrink: 0, // 横スクロール時に縮小させない
                  ...(selectedCategory === button.label
                    ? selectedStyle
                    : unselectedStyle),
                }}
                onClick={() => handleCategoryClick(button.label)}
              >
                {button.label}
              </button>
            ))}
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            sx={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {filterButtons.map((button) => (
              <button
                key={button.id}
                style={{
                  ...(selectedFilters.includes(button.id)
                    ? selectedStyle
                    : unselectedStyle),
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleFilterClick(button.id)}
              >
                {button.label}
                <ExpandMoreIcon />
              </button>
            ))}
          </Stack>
        </Container>
      </AppBar>
    </>
  );
};

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 28px;
  padding: 8px;
  svg {
    color: #3c3a37;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ff9500;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 50%;
  padding: 4px 6px;
  width: 20px;
  height: 20px;
`;

const HistoryButton = styled.button`
  margin-left: 0px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 30px;
  padding: 8px;
  svg {
    color: #3c3a37;
  }
`;

export default NavBar;
