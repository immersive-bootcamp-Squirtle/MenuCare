import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import AllergyIcon from "../AllergyIcon/AllergyIcon";

function AllergyList({ allergies, selectedAllergies, onClick  }) {
//   console.log("list_alg:", allergies);
  return (
    <>
      <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // 3列のグリッド
        gap: "5px", 
        justifyItems: "left", // 中央寄せ
        margin: "5px 0",
      }}
    >
      {allergies.map((allergy) => (
        <AllergyIcon
        key={allergy.allergy_id}
        name={allergy.allergy_name}
        isSelected={selectedAllergies.includes(allergy.allergy_id)} // 選択状態を渡す
        onClick={() => onClick(allergy.allergy_id)} // クリックイベントを親に渡す
      />
      ))}
      </Box>
    </>
  );
}


export default AllergyList;
