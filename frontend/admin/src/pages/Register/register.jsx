import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterButton from "../../components/RegisterButton/RegisterButton";
import AddMenuForm from "../../components/AddMenuForm/AddMenuForm";
import { Box, Typography } from "@mui/material";
import NavBar from "../../components/GlobalComponents/NavBar";

function Register() {
  // 全体のフォントを管理
  const theme = createTheme({
    typography: {
      fontFamily: ['"Noto Sans JP"', '"Open Sans"', "Arial", "sans-serif"].join(
        ","
      ),
    },
  });

  return (
    <>
    <NavBar />
    <Box
      sx={{
        padding: 2,
        margin: "0 auto",
        overflowY: "auto",
        height: "100VH",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            margin:"16px"
          }}
        >
          メニューの新規登録
        </Typography>
        <AddMenuForm />
        {/* <RegisterButton /> */}
      </ThemeProvider>
    </Box>
    </>
  );
}

export default Register;


//グローバルステート？でmenu_idを貰う必要がある？
