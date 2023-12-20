import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const setLoginCookie = useCallback((value) => {
    Cookies.set("isLogin", value, { expires: 1 });
  }, []);

  const setRoleCookie = useCallback((role) => {
    Cookies.set("role", role, { expires: 1 });
  }, []);

  const getLoginCookie = useCallback(() => {
    const cookieValue = Cookies.get("isLogin");
    if (cookieValue) {
      setIsLogin(cookieValue === "true");
    }
  }, []);

  useEffect(() => {
    getLoginCookie();
  }, [getLoginCookie]);

  const login = useCallback(
    async (username, password) => {
      try {
        if (username || password !== "") {
          const response = await axios.post("http://localhost:8000/api/login", {
            username: username,
            password: password,
          });

          setIsLogin(true);
          setLoginCookie(true);
          setRoleCookie(response.data.role);

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
    [navigate, setLoginCookie, setRoleCookie]
  );

  const logout = useCallback(() => {
    setIsLogin(false);
    setLoginCookie(false); // Setel cookie saat logout
    Cookies.remove("isLogin"); // Hapus cookie saat logout
    Cookies.remove("role"); // Hapus cookie role saat logout
    navigate("/");
  }, [navigate, setLoginCookie, setRoleCookie]);

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, msg }}>
      {children}
    </AuthContext.Provider>
  );
};
