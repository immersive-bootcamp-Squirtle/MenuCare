import { React } from "react";
import styled from "styled-components";
import AllergyIconButton from "../allergyIconButton/allergyIconButton";

function AllergyFilterModal() {
  return (
    <>
      <Frame>
        <SupplementaryExplanation>
          選択された項目を含まないメニューを表示します
        </SupplementaryExplanation>
        <AllergyHeading>特定原材料8品目</AllergyHeading>
        <AllergyIconList>
          <AllergyIconButton />
        </AllergyIconList>
        <AllergyHeading>特定原材料に準ずるもの20品目</AllergyHeading>
        <AllergyIconList>
          <AllergyIconButton />
        </AllergyIconList>
        <Button>メニューを絞り込む</Button>
      </Frame>
    </>
  );
}

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  color: #fff;
  background: linear-gradient(90deg, #f2994a, #f2c94c);
  border: none;
  border-radius: 30px;
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

const Frame = styled.div`
  border: 2px solid #000000;
  width: min(98vw, 98vh * 0.75);
  height: min(98vh, 98vw / 0.75);
  overflow: hidden;
`;

const SupplementaryExplanation = styled.p`
  text-align: left;
`;

const AllergyHeading = styled.h1`
  text-align: left;
  font-size: 20px;
`;

const AllergyIconList = styled.div`
  display: flex;
  margin: 0px 5px;
  justify-content: center;
`;

export default AllergyFilterModal;
