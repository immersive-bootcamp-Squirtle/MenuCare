import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "/vite.svg"; // ロゴのパス
import backgroundImage from "../../assets/background.jpg"; // 背景画像
import { signUp, signIn } from "../../modules/authService";
import { useLocation } from "react-router-dom";

function Welcome() {
  // 店舗向けのtokenを取得;
  const getToken = async (id) => {
    try {
      // signInを実行し、session storageにtokenを保持
      const session = await signIn(id, id);
      if (session && typeof session.AccessToken !== "undefined") {
        // 以下の1行は不要ではないか
        sessionStorage.setItem("accessToken", session.AccessToken);
      } else {
        console.error("SignIn session or AccessToken is undefined.");
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const id = query.get("id");

  getToken(id);

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

const SubText = styled.p`
  position: relative;
  padding: 0.8rem 1.8rem;
  font-size: 22px;
  font-weight: 600;
  font-family: "Noto Sans JP", sans-serif;
  color: #5a380c;
  margin-bottom: 150px;
  text-align: center;
  letter-spacing: 0.1em;

  &::before,
  &::after {
    position: absolute;
    width: 14px;
    height: 25px;
    content: "";
  }

  &::before {
    border-left: solid 4.5px;
    border-top: solid 4.5px;
    top: 0;
    left: 0;
  }

  &::after {
    border-right: solid 4.5px;
    border-bottom: solid 4.5px;
    bottom: 0;
    right: 0;
  }

  @media (max-width: 768px) {
    /* 大きめのスマホ */
    padding: 0.7rem 1.5rem;
    font-size: 18px;

    &::before,
    &::after {
      position: absolute;
      width: 10px;
      height: 18px;
      content: "";
    }

    &::before {
      border-left: solid 3.5px;
      border-top: solid 3.5px;
      top: 0;
      left: 0;
    }

    &::after {
      border-right: solid 3.5px;
      border-bottom: solid 3.5px;
      bottom: 0;
      right: 0;
    }
  }
  @media (max-width: 375px) {
    /* 小さいスマホ */
    padding: 0.5rem 1.2rem;
    font-size: 16px;
    &::before,
    &::after {
      position: absolute;
      width: 8px;
      height: 14px;
      content: "";
    }

    &::before {
      border-left: solid 3px;
      border-top: solid 3px;
      top: 0;
      left: 0;
    }

    &::after {
      border-right: solid 3px;
      border-bottom: solid 3px;
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
