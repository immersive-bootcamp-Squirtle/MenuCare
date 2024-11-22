import { React } from "react";
import styled from "styled-components";
import AllergyList from "../allergyList/allergyList";

function AllergyFilterModal({ onClose, allergies, selectedAllergies, onToggle }) { //onClose のみだと上手くいかない
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
        <AllergyHeading>特定原材料8品目</AllergyHeading>
        <AllergyList 
            allergies={allergies} 
            selectedAllergies={selectedAllergies}
            onToggle={onToggle}
          />
      </Section>

      {/* <Section>
        <AllergyHeading>特定原材料に準ずるもの20品目</AllergyHeading>
        <AllergyList />
      </Section> */}

      <Footer>
        <Button>メニューを絞り込む</Button>
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
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const SupplementaryExplanation = styled.p`
  text-align: left;
  font-size: 12px;
  color: #555;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 16px;
  background-color: #f9f9f9;
`;

const AllergyHeading = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background: linear-gradient(90deg, #f2994a, #f2c94c);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  `;


export default AllergyFilterModal;
