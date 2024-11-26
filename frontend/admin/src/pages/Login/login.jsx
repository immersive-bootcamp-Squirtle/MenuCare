import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/vite.svg"; // ロゴのパス
import backgroundImage from "../../assets/background.jpg"; // 背景画像
import TextField from '@mui/material/TextField';
import {signUp, signIn} from "../../modules/authService";

function Login() {
  // React上の画面遷移
  const navigate = useNavigate();

  // ユーザ情報を保持するstateを定義
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    // ボタン押下時のreloadを抑止
    e.preventDefault();
    try {
      // signInを実行し、session storageにtokenを保持
      const session = await signIn(email, password);
      console.log(email)
      console.log(password)
      console.log("Sign in successful", session);
      if (session && typeof session.AccessToken !== "undefined") {
        // 以下の1行は不要ではないか
        sessionStorage.setItem("accessToken", session.AccessToken);
        // sessionStorageにaccessTokenがある場合、/admin/homeへ画面遷移する
        if (sessionStorage.getItem("accessToken")) {  
          navigate("/admin/home")
          // window.location.href = "/admin/home";
        } else {
          console.error("Session token was not set properly.");
        }
      } else {
        console.error("SignIn session or AccessToken is undefined.");
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }

  };

  return (
    <Frame>
      <Header>
        <Logo src={logo} alt="MenuCare Logo" />
      </Header>
      <Title>管理者ログイン画面</Title>
      <LoginForm>
        <InputFiled
            required
            id="outlined-email"
            label="Email"
            type="email"
            placeholder="exmample@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <InputFiled
            required
            id="outlined-password"
            label="Password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignIn}>LOGIN</Button>
      </LoginForm>
     <EmptyDiv/>
    </Frame>
  );
}

export default Login;

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
  width: 200px; /* ロゴの幅 */
  height: 200px;

  @media (max-width: 768px) {
    width: 150px; /* スマホでの幅調整 */
    height: 150px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  font-family: "Jost", sans-serif;
  color: #5a380c;
  margin-bottom: 0px;
  letter-spacing: 0.07em;
  margin-bottom: 10px;

  @media (max-width: 768px) {}
`;

const LoginForm = styled.form`
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .css-1xp5r68-MuiFormControl-root-MuiTextField-root {
    margin: 5px;
  }

  @media (max-width: 1000px) {
    width: 40%; /* PCディスプレイ半分での幅調整 */
  }

  @media (max-width: 768px) {
    width: 60%; /* スマホでの幅調整 */
  }
`;

const InputFiled = styled(TextField)`
  width: 100%;
`

const Button = styled.button`
  padding: 12px 84px;
  font-size: 18px;
  font-weight: 700;
  font-family: "Noto Sans JP", sans-serif;
  color: #fff;
  background: linear-gradient(90deg, #f2994a, #f2c94c); /* グラデーション背景 */
  border: none;
  border-radius: 30px; /* ボタンの丸み */
  margin-top: 15px;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 70px;
  }
`;

const EmptyDiv = styled.div`
  height: 50%;
`
