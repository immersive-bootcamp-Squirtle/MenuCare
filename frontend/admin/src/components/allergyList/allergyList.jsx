import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AllergyIconButton from "../allergyIconButton/allergyIconButton";

// 実装イメージ
// 1 . アレルギー情報のリストを引数に受け取り、mapで<AllergyIconButton />を生成するようにしたいです。
function AllergyList({ allergies, selectedAllergiesOnFilter,onToggle })  {
  return (
    <>
      <AllergyIconList>
      {allergies.map((allergy) => (
        <AllergyIconButton
          key={allergy.allergy_id} 
          label={allergy.allergy_name} 
          isSelected={selectedAllergiesOnFilter.includes(allergy.allergy_name)} // 選択状態
          onClick={() => onToggle(allergy.allergy_name)} // クリックで選択状態をトグル
        />
      ))}
     </AllergyIconList>
    </>
  );
}

const AllergyIconList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px; 
  justify-content: center;
  margin: 10px 0;
`;

export default AllergyList;