import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import Home from "./pages/Home/home";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/home",
    element: <Home />,
  },
  {
    path: "/admin/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);

const theme = createTheme({
  palette: {
    background: {
      default: "#f2ede5", // 背景色を指定
    },
  },
  typography: {
    fontFamily: ['"Noto Sans JP"', '"Open Sans"', "Arial", "sans-serif"].join(
      ","
    ),
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>
);
