import React from "react";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const MenuList = ({ items, selectedAllergies}) => {
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
          padding: "15px 10px",
        }}
      >
        フード
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          gridAutoRows: "minmax(auto, auto)",
          backgroundColor: "#f2ede5",
          padding: "15px 10px",
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
  );
};

export default MenuList;
