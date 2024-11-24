import React from "react";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const MenuList = ({ items }) => {
  return (
    <Box sx={{ padding: 0, margin: "0 auto" }}>
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
        {items.map((item) => (
          <Box key={item.menu_id}>
            <MenuItem item={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MenuList;
