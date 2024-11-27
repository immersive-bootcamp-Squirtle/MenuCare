import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import logo from "../../../public/logo.svg"; // ロゴのパス
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useNavigate } from "react-router-dom";

function NavBar() {
  // ロゴクリックでホーム画面に遷移
  const navigate = useNavigate();
  const handleGoBackHome = () => {
    navigate("/admin/home");
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#fff",
          height: "clamp(3.75rem, 3.393rem + 1.79vw, 5rem)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 900,
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          sx={{
            alignItems: "center", // 中央揃え
            justifyContent: "space-between",
            paddingLeft: "clamp(0.25rem, 0.036rem + 1.07vw, 1rem)",
            paddingRight: "clamp(0.25rem, 0.036rem + 1.07vw, 1rem)",
          }}
        >
          <Logo
            src={logo}
            alt="MenuCare Logo"
            sx={{
              //   position: "fixed",
              //   bottom: "20px",
              //   right: "20px",
              //   width: "clamp(3.75rem, 3.214rem + 2.68vw, 5.625rem)",
              //   height: "clamp(3.75rem, 3.214rem + 2.68vw, 5.625rem)",
              //   backgroundColor: "#f2a24a",
              //   borderRadius: "50%",
              //   boxShadow: "5px 6px 6px rgba(0, 0, 0, 0.2)",
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleGoBackHome}
          />
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            sx={{
              flexGrow: 0,
              color: "#3c3a37",
              fontSize: "clamp(18px, 4vw, 28px)",
            }}
          >
            管理者画面
          </Typography>
          <AccountCircleSharpIcon
            alt="Account Icon"
            sx={{
              color: "#3c3a37",
              width: "clamp(2.5rem, 2.143rem + 1.79vw, 3.75rem)",
              height: "clamp(2.5rem, 2.143rem + 1.79vw, 3.75rem)",
            }}
          />
        </Stack>
      </AppBar>
    </>
  );
}

const Logo = styled.img`
  width: clamp(4.063rem, 3.705rem + 1.79vw, 5.313rem);
  height: clamp(4.063rem, 3.705rem + 1.79vw, 5.313rem);
  }
`;

export default NavBar;
