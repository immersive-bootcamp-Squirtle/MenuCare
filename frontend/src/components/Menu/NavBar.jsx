import React, { useState } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const NavBar = ({ openModal }) => {  // openModalを受け取る　　
  const categoryButtons = [
    { id: 1, label: "すべて" },
    { id: 2, label: "フード" },
    { id: 3, label: "ドリンク" },
  ];

  const filterButtons = [
    { id: 4, label: "アレルギーあり" },
    { id: 5, label: "食事制限あり" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const selectedStyle = {
    padding: "12px 24px",
    fontSize: "18px",
    color: "#fff",
    background: "linear-gradient(90deg, #f2994a, #f2c94c)",
    border: "2px solid #f2ede5",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
      padding: "10px 20px",
    },
  };

  const unselectedStyle = {
    padding: "12px 24px",
    fontSize: "18px",
    color: "#dbd6cd",
    background: "#fff",
    border: "2px solid #dbd6cd",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
      padding: "10px 20px",
    },
  };

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
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
      <AppBar sx={{ backgroundColor: "#f2ede5" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0, color: "black" }}
          >
            メニュー一覧
          </Typography>
        </Toolbar>

        <Container>
          <Stack spacing={2} direction="row">
            {categoryButtons.map((button) => (
              <button
                key={button.id}
                style={
                  selectedCategory === button.id
                    ? selectedStyle
                    : unselectedStyle
                }
                onClick={() => handleCategoryClick(button.id)}
              >
                {button.label}
              </button>
            ))}
          </Stack>

          <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
            {filterButtons.map((button) => (
              <button
                key={button.id}
                style={
                  selectedFilters.includes(button.id)
                    ? selectedStyle
                    : unselectedStyle
                }
                onClick={() => handleFilterClick(button.id)}
              >
                {button.label}
              </button>
            ))}
          </Stack>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
