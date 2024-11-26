import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "/vite.svg"; // ロゴのパス
import backgroundImage from "../../assets/background.jpg"; // 背景画像
import TextField from '@mui/material/TextField';

function Login() {
  const navigate = useNavigate();

  const handleStartOrder = () => {
    navigate("/menu");
  };

  return (
    <Frame>
      <Header>
        <Logo src={logo} alt="MenuCare Logo" />
      </Header>
      <LoginForm>
        <InputFiled
            required
            id="outlined-email"
            label="Email"
            type="email"
            placeholder="exmample@gmail.com"
        />
        <InputFiled
            required
            id="outlined-password"
            label="Password"
            type="password"
            placeholder="password"
        />
        <Button onClick={handleStartOrder}>LOGIN</Button>
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
  width: 100px; /* ロゴの幅 */
  height: 100px;

  @media (max-width: 768px) {
    width: 100px; /* スマホでの幅調整 */
    height: 100px;
  }
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
  height: 30%;
`
