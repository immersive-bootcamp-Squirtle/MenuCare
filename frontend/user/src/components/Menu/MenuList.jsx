import React from "react";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const MenuList = ({
  items,
  selectedAllergies,
  selectedCategory,
  onItemClick,
}) => {
  // 空データ処理
  if (!items || Object.keys(items).length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginTop: "20px",
          color: "#3c3a37",
          fontWeight: 400,
          fontFamily: "'Noto Sans JP', sans-serif",
        }}
      >
        メニューがありません
      </Typography>
    );
  }

  // カテゴリ翻訳
  const categoryTranslations = {
    Appetizers: "前菜",
    Main: "メイン",
    Desserts: "デザート",
    Beverages: "飲み物",
    Others: "その他",
  };

  const translateCategory = (category) =>
    categoryTranslations[category] || category;

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
      {Object.entries(items)
        .filter(
          ([category]) =>
            selectedCategory === "すべて" ||
            translateCategory(category) === selectedCategory
        ) // 選択されたカテゴリのみ表示
        .map(([category, menuList]) => {
          // アレルギー一致のアイテムを後ろに並べ替える
          const sortedMenuList = menuList.sort((a, b) => {
            const aHasAllergy = a.allergies.some((allergy) =>
              selectedAllergies.includes(allergy)
            );
            const bHasAllergy = b.allergies.some((allergy) =>
              selectedAllergies.includes(allergy)
            );
            if (aHasAllergy && !bHasAllergy) return 1;
            if (!aHasAllergy && bHasAllergy) return -1;
            return 0;
          });

          return (
            <Box key={category} sx={{ marginBottom: "40px" }}>
              {/* カテゴリヘッダー */}
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  textAlign: "left",
                  color: "#3c3a37",
                  backgroundColor: "#fff",
                  fontSize: "clamp(20px, 3vw, 24px)",
                  padding: "10px 20px",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                {translateCategory(category)}
              </Typography>
              {/* カテゴリ内のメニューアイテム */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)", // スマホでは2列
                    sm: "repeat(2, 1fr)", // タブレットでは2列
                    md: "repeat(3, 1fr)", // PCでは3列
                  },
                  gap: 2,
                  padding: "20px",
                  backgroundColor: "#f9f4ee",
                  width: "clamp(20rem, 100vw, 75rem)",
                  margin: "0 auto",
                  minHeight: "800px", // メニューロード前に真っ黒になる問題への対処
                }}
              >
                {sortedMenuList.map((item) => {
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
                        key={item.menu_id}
                        item={item}
                        onClick={() => onItemClick(item)}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default MenuList;
