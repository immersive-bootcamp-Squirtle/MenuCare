import React from "react";
import { Box } from "@mui/material";
import AllergyIconForRegister from "../AllergyIconForRegister/AllergyIconForRegister";

function AllergyListCardForRegister({ allergies, selectedAllergies, onClick }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", // 自動調整
        gap: "10px",
        justifyItems: "start", // 左寄せ
        alignItems: "center",
        margin: "5px 0",
        maxWidth: "100%", // グリッド全体の最大幅
        margin: "0 auto", // 中央寄せ
      }}
    >
      {allergies.map((allergy) => (
        <AllergyIconForRegister
          key={allergy.allergy_id}
          name={allergy.allergy_name}
          isSelected={selectedAllergies.includes(allergy.allergy_id)}
          onClick={() => onClick(allergy.allergy_id)}
        />
      ))}
    </Box>
  );
}

export default AllergyListCardForRegister;
