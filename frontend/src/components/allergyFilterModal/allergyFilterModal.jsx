import { React } from "react";
import styled from "styled-components";

function AllergyFilterModal() {
  return (
    <>
      <Frame>
        <SupplementaryExplanation>
          選択された項目を含まないメニューを表示します
        </SupplementaryExplanation>
        <AllergyHeading>特定原材料8品目</AllergyHeading>
        <p>ここにアレルギーアイコンのリスト</p>
        <AllergyHeading>特定原材料に準ずるもの20品目</AllergyHeading>
        <p>ここにアレルギーアイコンのリスト</p>
        <p>ここに固定の絞り込みボタン</p>
      </Frame>
    </>
  );
}

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

export default AllergyFilterModal;
