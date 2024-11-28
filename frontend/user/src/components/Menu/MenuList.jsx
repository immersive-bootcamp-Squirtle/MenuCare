import React from "react";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const MenuList = ({ items, selectedAllergies, onItemClick }) => {
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
    <Box
      sx={{
        padding: 0,
        margin: "0 auto",
        overflowY: "auto",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          textAlign: "left",
          color: "#3c3a37",
          backgroundColor: "#fff",
          fontSize: "clamp(22px, 4vw, 28px)",
          padding:
            "clamp(0.625rem, 0.511rem + 0.57vw, 0.938rem) clamp(0.625rem, 0.398rem + 1.14vw, 1.25rem)",
        }}
      >
        フード
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // スマホでは2列
            sm: "repeat(2, 1fr)", // タブレットでは2列
            md: "repeat(3, 1fr)", // PCでは3列
          },
          gap: 2,
          gridAutoRows: "minmax(auto, auto)",
          backgroundColor: "#f2ede5",
          padding: "20px clamp(0.938rem, -0.994rem + 9.66vw, 6.25rem)",
          width: "clamp(20rem, 100vw, 75rem)",
          margin: "0 auto",
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
              <MenuItem
                key={item.id}
                item={item}
                onClick={() => onItemClick(item)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MenuList;
