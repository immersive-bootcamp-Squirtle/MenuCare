import { React } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// 実装方針
// 1. アレルギー情報を引数として、該当のアイコンを生成したいです。※ 今は卵とピーナッツを2つ書いてますが、一つにし、内容は引数から取るイメージです。
function AllergyIconButton() {
  return (
    <>
      <AllergyIcon>
        <AllergyIconContent>
          <div>卵</div>
          <CheckCircleOutlineIcon />
        </AllergyIconContent>
      </AllergyIcon>
      <AllergyIcon>
        <AllergyIconContent>
          <div>ピーナッツ</div>
          <CheckCircleOutlineIcon />
        </AllergyIconContent>
      </AllergyIcon>
    </>
  );
}

const AllergyIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-color: white;
  color: red;
  width: calc(90% / 2);
  margin: calc(3% / 2);
  border-radius: 16px;
`;

const AllergyIconContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 10px 2.5px;
`;

export default AllergyIconButton;
