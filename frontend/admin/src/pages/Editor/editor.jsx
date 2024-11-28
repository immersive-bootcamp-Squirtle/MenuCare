import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterButton from "../../components/RegisterButton/RegisterButton";
import EditMenuForm from "../../components/EditMenuForm/EditMenuForm";
import { Box, Typography } from "@mui/material";
import NavBar from "../../components/GlobalComponents/NavBar";

function Editor() {
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
          メニューの更新
        </Typography>
        <EditMenuForm />
        {/* <RegisterButton /> */}
      </ThemeProvider>
    </Box>
    </>
  );
}

export default Editor;


//グローバルステート？でmenu_idを貰う必要がある？
