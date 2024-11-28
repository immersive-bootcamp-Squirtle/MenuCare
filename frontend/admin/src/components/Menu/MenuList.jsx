import React from "react";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const MenuList = ({ items, selectedAllergies, onDelete, onEdit }) => {
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
            fontSize: "clamp(22px, 4vw, 28px)",
            padding: "10px 50px",
            width: "clamp(20rem, 100vw, 75rem)",
            margin: "0 auto",
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
            gap: "min(1rem, 3vw)",
            gridAutoRows: "minmax(auto, auto)",
            padding: "10px 50px",
            width: "clamp(20rem, 100vw, 75rem)",
            margin: "0 auto",
            justifyContent: "center",
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
                  opacity: isGrayout ? 0.5 : 1,
                  // グレーアウト
                }}
              >
                <MenuItem item={item} onDelete={onDelete} onEdit={onEdit} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default MenuList;
