import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [exp, setExp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getDaftar();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExp(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJwt = axios.create();
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

  const getDaftar = async () => {
    try {
      const response = await axiosJwt.get(
        "http://localhost:8000/api/daftar-menunggu",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1 className="text-black font-bold font-roboto text-3xl">Dashboard</h1>
      <button onClick={getDaftar}>get daftar</button>
    </div>
  );
};

export default Dashboard;
