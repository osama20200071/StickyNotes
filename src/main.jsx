import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Form.css";
import ThemeContext from "./context/ThemeContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./pages/Layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeContext>
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<App />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<>not found</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  </ThemeContext>
  // </React.StrictMode>
);
