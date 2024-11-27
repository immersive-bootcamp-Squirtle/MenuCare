import { React } from "react";
import styled from "styled-components";
import AllergyList from "../allergyList/allergyList";

function AllergyFilterModal({
  onClose,
  allergies,
  selectedAllergies,
  selectedAllergiesOnFilter,
  onToggle,
  onClick
}) {

  // 配列要素比較 (共通部品にしたい)
  const arraysHaveSameElements = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }
    return true;
}

  //onClose のみだと上手くいかない
  return (
    <ModalWrapper>
      <ModalContent>
        <Header>
          <Title>絞り込み</Title>
          {/* onClose関数を受け取ったらモーダルを閉じられるように */}
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <SupplementaryExplanation>
          選択された項目を含まないメニューを表示します
        </SupplementaryExplanation>

        <Section>
          {/* <AllergyHeading>特定原材料8品目</AllergyHeading> */}
          <AllergyList
            allergies={allergies}
            selectedAllergies={selectedAllergies}
            selectedAllergiesOnFilter={selectedAllergiesOnFilter}
            onToggle={onToggle}
          />
        </Section>

        {/* <Section>
        <AllergyHeading>特定原材料に準ずるもの20品目</AllergyHeading>
        <AllergyList />
      </Section> */}

        <Footer>
          {arraysHaveSameElements(selectedAllergies, selectedAllergiesOnFilter) ? <InactiveButton disabled={true}>メニューを絞り込む</InactiveButton> : <ActiveButton onClick={onClick}>メニューを絞り込む</ActiveButton>}
        </Footer>
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 背景を暗くする？ */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 1000; /* 最前面に表示 */
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px 16px 0 0;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);

  animation: slideUp 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 95%;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  position: relative;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  font-family: "Noto Sans JP", sans-serif;
  color: #3c3a37;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 40px;
  color: gray;
  cursor: pointer;
  position: absolute;
  right: 1px;
`;

const SupplementaryExplanation = styled.p`
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  font-family: "Noto Sans JP", sans-serif;
  color: #555;
  padding-top: 16px;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 16px;
  // background-color: #f9f9f9;
`;

const AllergyHeading = styled.h2`
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  font-family: "Noto Sans JP", sans-serif;
  margin-bottom: 8px;
  color: #555;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const ActiveButton = styled.button`
  padding: 10px 80px;
  font-size: 14px;
  font-weight: 500;
  font-family: "Noto Sans JP", sans-serif;
  color: white;
  background: linear-gradient(90deg, #f2994a, #f2c94c);
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const InactiveButton = styled.button`
  padding: 10px 80px;
  font-size: 14px;
  font-weight: 500;
  font-family: "Noto Sans JP", sans-serif;
  color: white;
  background: gray
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

export default AllergyFilterModal;
