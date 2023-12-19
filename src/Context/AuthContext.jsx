import React, { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = useCallback(
    async (username, password) => {
      try {
        if (username || password !== "") {
          const response = await axios.post("http://localhost:8000/api/login", {
            username: username,
            password: password,
          });

          setIsLogin(true);

          response.data.role === "admin"
            ? navigate("/admin")
            : navigate("/pengajuan");
        } else {
          setMsg("Tolong Isi Form Username dan Password");
        }
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setIsLogin(false);
    navigate("/");
  }, [navigate]);


  return (
    <AuthContext.Provider value={{ isLogin, login, logout, msg, }}>
      {children}
    </AuthContext.Provider>
  );
};
