import { React } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// 実装方針
// 1. アレルギー情報を引数として、該当のアイコンを生成したいです。※ 今は卵とピーナッツを2つ書いてますが、一つにし、内容は引数から取るイメージです。
function AllergyIconButton({ label, isSelected, onClick }) {
  return (
    <AllergyIcon isSelected={isSelected} onClick={onClick}>
      <AllergyIconContent>
        <div>{label}</div>
        <CheckCircleOutlineIcon
          style={{
            color: isSelected ? "green" : "gray", // 選択状態に応じてアイコンの色を変更
          }}
        />
      </AllergyIconContent>
    </AllergyIcon>
  );
}

const AllergyIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isSelected ? "#f2c94c" : "white"}; /* 選択時の背景色 */
  border: 2px solid
    ${(props) => (props.isSelected ? "#f2994a" : "#ddd")}; /* 選択時の枠線色 */
  color: ${(props) => (props.isSelected ? "black" : "#555")};
  width: 24%;
  padding: 5px;
  margin: 5px;
  border-radius: 20px; 
  cursor: pointer;
  text-align: center;
  font-size: 12px; 
  font-weight: bold;

  @media (max-width: 768px) {
    width: 30%; 
    font-size: 10px; 
  }
`;


const AllergyIconContent = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  font-size: 12px; 
  text-align: center;
  word-wrap: break-word;
`;

export default AllergyIconButton;
