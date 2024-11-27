import React from "react";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";
import NavBar from "../GlobalComponents/NavBar";

const MenuList = ({ items, selectedAllergies }) => {
  // アレルギーに基づいてソート
  const sortedItems = [...items].sort((a, b) => {
    const aHasAllergy = a.allergies.some((allergy) =>
      selectedAllergies.includes(allergy)
    );
    const bHasAllergy = b.allergies.some((allergy) =>
      selectedAllergies.includes(allergy)
    );

    // アレルギーが一致する場合は後ろに移動
    if (aHasAllergy && !bHasAllergy) return 1;
    if (!aHasAllergy && bHasAllergy) return -1;
    return 0;
  });

  return (
    <>
      <NavBar />
      <Box
        sx={{
          padding: 0,
          margin: "0 auto",
          overflowY: "auto",
          // backgroundColor: "#f9f7f2",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            textAlign: "left",
            color: "#3c3a37",
            fontSize: "clamp(22px, 4vw, 28px)",
            padding: "15px 10px",
          }}
        >
          メニュー一覧
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // スマホでは1列
              sm: "repeat(2, 1fr)", // タブレットでは2列
              md: "repeat(3, 1fr)", // PCでは3列
            },
            gap: 1,
            gridAutoRows: "minmax(auto, auto)",
            padding: "10px 5px",
          }}
        >
          {sortedItems.map((item) => {
            const isGrayout = item.allergies.some((allergy) =>
              selectedAllergies.includes(allergy)
            ); // 一致するアレルギーがあるか

            return (
              <Box
                key={item.menu_id}
                sx={{
                  opacity: isGrayout ? 0.5 : 1, // グレーアウト
                }}
              >
                <MenuItem item={item} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default MenuList;
