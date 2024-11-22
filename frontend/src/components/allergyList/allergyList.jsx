import { React } from "react";
import styled from "styled-components";
import AllergyIconButton from "../allergyIconButton/allergyIconButton";

// 実装イメージ
// 1 . アレルギー情報のリストを引数に受け取り、mapで<AllergyIconButton />を生成するようにしたいです。
function AllergyList() {
  return (
    <>
      <AllergyIconList>
        <AllergyIconButton />
      </AllergyIconList>
    </>
  );
}

const AllergyIconList = styled.div`
  display: flex;
  margin: 0px 5px;
  justify-content: center;
`;

export default AllergyList;
