import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import Home from "./pages/Home/home";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";

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
