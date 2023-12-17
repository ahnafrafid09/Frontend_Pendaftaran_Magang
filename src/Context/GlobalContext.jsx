import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [exp, setExp] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExp(decoded.exp);
      setName(decoded.name);
      setEmail(decoded.email);
      setRole(decoded.role);
      setUsername(decoded.username);
      setId(decoded.id);
    } catch (error) {
      if (error.response) {
        return <Navigate to="/login" />;
      }
    }
  };

  const axiosJwt = axios.create({ baseURL: "http://localhost:8000/api/" });
  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (exp * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:8000/api/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setExp(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //   get data

  let globalContext = {
    axiosJwt,
    token,
    name,
    role,
    email,
    username,
    id,
  };

  return (
    <GlobalContext.Provider
      value={{
        globalContext,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
