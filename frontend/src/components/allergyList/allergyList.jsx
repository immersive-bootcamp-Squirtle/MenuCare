import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AllergyIconButton from "../allergyIconButton/allergyIconButton";
import axios from "axios"; 

// 実装イメージ
// 1 . アレルギー情報のリストを引数に受け取り、mapで<AllergyIconButton />を生成するようにしたいです。
function AllergyList({ allergies = [], selectedAllergies = [], onToggle })  {//デフォルト値を空配列に設定
  return (
    <>
      <AllergyIconList>
      {allergies.map((allergy) => (
        <AllergyIconButton
          key={allergy.allergy_id} 
          label={allergy.allergy_name} 
          isSelected={selectedAllergies.includes(allergy.allergy_id)} // 選択状態
          onClick={() => onToggle(allergy.allergy_id)} // クリックで選択状態をトグル
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
