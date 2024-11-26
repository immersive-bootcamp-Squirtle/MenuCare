import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "/vite.svg"; // ロゴのパス
import backgroundImage from "../../assets/background.jpg"; // 背景画像

function Welcome() {
  const navigate = useNavigate();

  const handleStartOrder = () => {
    navigate("/menu");
  };

  return (
    <Frame>
      <Header>
        <Logo src={logo} alt="MenuCare Logo" />
      </Header>
      <Content>
        <Title>WELCOME</Title>
        <SubText>すべての食事に、安心と配慮を</SubText>
        <Button onClick={handleStartOrder}>注文を始める</Button>
      </Content>
    </Frame>
  );
}

export default Welcome;

// スタイリング
const Frame = styled.div`
  margin: 0; /* 余白をリセット */
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 縦方向に中央揃え */
  align-items: center; /* 横方向に中央揃え */
  background-image: url(${backgroundImage}); /* 背景画像 */
  background-size: cover; /* 画像を全体に広げる */
  background-position: center; /* 中央揃え */
`;

const Header = styled.div`
  position: center;
  top: 20px;
  left: 20px;
`;

const Logo = styled.img`
  width: 60px; /* ロゴの幅 */
  height: 60px;

  @media (max-width: 768px) {
    width: 100px; /* スマホでの幅調整 */
    height: 100px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  font-family: "Jost", sans-serif;
  color: #5a380c;
  margin-bottom: 0px;
  letter-spacing: 0.07em;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const SubText = styled.p`
  position: relative;
  padding: 1rem 1.8rem;
  font-size: 24px;
  font-weight: 600;
  font-family: "Noto Sans JP", sans-serif;
  color: #5a380c;
  margin-bottom: 150px;
  text-align: center;
  letter-spacing: 0.1em;

  &::before,
  &::after {
    position: absolute;
    width: 15px;
    height: 40px;
    content: "";
  }

  &::before {
    border-left: solid 5px;
    border-top: solid 5px;
    top: 0;
    left: 0;
  }

  &::after {
    border-right: solid 5px;
    border-bottom: solid 5px;
    bottom: 0;
    right: 0;
  }

  @media (max-width: 768px) {
    font-size: 18px;

    &::before,
    &::after {
      position: absolute;
      width: 12px;
      height: 30px;
      content: "";
    }

    &::before {
      border-left: solid 5px;
      border-top: solid 5px;
      top: 0;
      left: 0;
    }

    &::after {
      border-right: solid 5px;
      border-bottom: solid 5px;
      bottom: 0;
      right: 0;
    }
  }
  @media (max-width: 375px) {
    padding: 1rem 1.5rem;
    font-size: 15px;
    &::before,
    &::after {
      position: absolute;
      width: 10px;
      height: 25px;
      content: "";
    }

    &::before {
      border-left: solid 4px;
      border-top: solid 4px;
      top: 0;
      left: 0;
    }

    &::after {
      border-right: solid 4px;
      border-bottom: solid 4px;
      bottom: 0;
      right: 0;
    }
  }
`;

const Button = styled.button`
  padding: 12px 84px;
  font-size: 18px;
  font-weight: 700;
  font-family: "Noto Sans JP", sans-serif;
  color: #fff;
  background: linear-gradient(90deg, #f2994a, #f2c94c); /* グラデーション背景 */
  border: none;
  border-radius: 30px; /* ボタンの丸み */

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 70px;
  }
`;
