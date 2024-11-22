import { React } from "react";
import styled from "styled-components";
import AllergyList from "../allergyList/allergyList";

function AllergyFilterModal() {
  return (
    <>
      <SupplementaryExplanation>
        選択された項目を含まないメニューを表示します
      </SupplementaryExplanation>
      <AllergyHeading>特定原材料8品目</AllergyHeading>
      <AllergyList />
      <AllergyHeading>特定原材料に準ずるもの20品目</AllergyHeading>
      <AllergyList />
      <Button>メニューを絞り込む</Button>
    </>
  );
}

const SupplementaryExplanation = styled.p`
  text-align: left;
`;

const AllergyHeading = styled.h1`
  text-align: left;
  font-size: 20px;
`;

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

export default AllergyFilterModal;
