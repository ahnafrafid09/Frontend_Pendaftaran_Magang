import React from "react";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LayoutAdmin from "./Pages/Admin/LayoutAdmin";
import LayoutUser from "./Pages/User/LayoutUser";
import LandingPages from "./Pages/LandingPages/LandingPages";
import { AuthProvider } from "./Context/AuthContext.jsx";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const PrivateRouteAdmin = ({ element }) => {
    const isLoginFromCookie = Cookies.get("isLogin") === "true";
    const roleFromCookie = Cookies.get("role");

    if (isLoginFromCookie && roleFromCookie === "admin") {
      return element;
    } else if (isLoginFromCookie) {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/login" state={{ from: "/admin" }} replace />;
    }
  };

  const PrivateRouteUser = ({ element }) => {
    const isLoginFromCookie = Cookies.get("isLogin") === "true";

    if (!isLoginFromCookie) {
      return <Navigate to="/login" replace />;
    }
    return element;
  };

  const LoginRoute = ({ element }) => {
    const isLoginFromCookie = Cookies.get("isLogin") === "true";
    const roleFromCookie = Cookies.get("role");

    if (isLoginFromCookie && roleFromCookie) {
      return <Navigate to={`/${roleFromCookie}`} replace />;
    }
    return element;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" exact element={<LandingPages />} />
          <Route path="/login" element={<LoginRoute element={<Login />} />} />
          <Route
            path="/register"
            element={<LoginRoute element={<Register />} />}
          />
          <Route
            path="/admin/*"
            element={<PrivateRouteAdmin element={<LayoutAdmin />} />}
          />
          <Route
            path="/*"
            element={<PrivateRouteUser element={<LayoutUser />} />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
