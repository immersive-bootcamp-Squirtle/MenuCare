import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.jsx";
import Welcome from "./pages/Welcome/welcome.jsx";
import Menu from "./pages/Menu/menu.jsx";

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
    path: "not_available",
    element: <h1>ただいま離席中です</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>
);
