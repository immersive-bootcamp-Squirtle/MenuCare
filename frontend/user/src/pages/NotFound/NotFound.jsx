import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "/vite.svg"; // ロゴのパス
import backgroundImage from "../../assets/background.jpg"; // 背景画像

function NotFound() {
  const navigate = useNavigate();

  const handleStartOrder = () => {
    navigate("/welcome");
  };

  return (
    <Frame>
      <Header>
        <Logo src={logo} alt="MenuCare Logo" />
      </Header>
      <Content>
        <Title>お探しのページは見つかりませんでした</Title>
        <Button onClick={handleStartOrder}>トップに戻る</Button>
      </Content>
      <EmptyDiv/>
    </Frame>
  );
}

export default NotFound;

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
  width: 100px; /* ロゴの幅 */
  height: 100px;

  @media (max-width: 768px) {
    /* 大きめのスマホ */
    width: 100px;
    height: 100px;
  }
  @media (max-width: 375px) {
    /* 小さいスマホ */
    width: 80px;
    height: 80px;
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
    /* 大きめのスマホ */
    font-size: 44px;
  }
  @media (max-width: 375px) {
    /* 小さいスマホ */
    font-size: 40px;
  }
`;

const Button = styled.button`
  padding: 12px 84px;
  margin-top: 30px;
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

const EmptyDiv = styled.div`
  height: 50%;
`
