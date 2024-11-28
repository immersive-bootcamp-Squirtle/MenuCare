import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.jsx";
import Welcome from "./pages/Welcome/welcome.jsx";
import Menu from "./pages/Menu/menu.jsx";
import Cart from "./pages/Cart/cart.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import OrderHistory from "./pages/OrderHistory/orderhistory.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/cart", // Cartのルートを追加
    element: <Cart />,
  },
  {
    path: "/order-history", // 注文履歴のルートを追加
    element: <OrderHistory />,
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
