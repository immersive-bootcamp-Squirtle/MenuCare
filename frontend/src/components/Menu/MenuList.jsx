import React from "react";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const MenuList = ({ items }) => {
  return (
    <Box sx={{ padding: 2, margin: "0 auto" }}>
      <Typography variant="h4">
        Menu
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", 
          gap: 2,
          gridAutoRows: "minmax(auto, auto)", 
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
