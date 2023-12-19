import React from "react";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LayoutAdmin from "./Pages/Admin/LayoutAdmin";
import LayoutUser from "./Pages/User/LayoutUser";
import LandingPages from "./Pages/LandingPages/LandingPages";
import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";

function App() {
  const PrivateRouteAdmin = (props) => {
    const { isLogin } = useAuth();
    if (!isLogin) {
      return <Navigate to="/login" />;
    } else if (isLogin) {
      return props.children;
    }
  };
  const PrivateRouteUser = (props) => {
    const { isLogin } = useAuth();
    if (!isLogin) {
      return <Navigate to="/login" />;
    } else if (isLogin) {
      return props.children;
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<LandingPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRouteAdmin>
                <LayoutAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRouteUser>
                <LayoutUser />
              </PrivateRouteUser>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
