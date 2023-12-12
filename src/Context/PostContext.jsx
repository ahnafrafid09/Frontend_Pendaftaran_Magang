import React, { createContext, useState, useEffect, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const { globalContext } = useContext(GlobalContext);
  const { axiosJwt, token } = globalContext;
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [inputDaftar, setInputDaftar] = useState({
    instansi: {
      namaInstansi: "",
      alamatInstansi: "",
      kategori: "",
      status: "",
    },
    surat: {
      id: 0,
      pdfFile: null,
      noSurat: "",
      url: "",
      tglPengajuan: "",
    },
    pelamar: [],
  });
  const [inputMagang, setInputMagang] = useState({
    tglMasuk: "",
    tglSelesai: "",
    bagian: "",
  });
  const [inputUser, setInputUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    password: "",
    confPassword: "",
  });

  const tambahUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJwt.post("/register", inputUser);
      setInputUser({
        name: "",
        username: "",
        email: "",
        role: "",
        password: "",
        confPassword: "",
      });
      return response;
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const terimaPelamar = async (e, instansiId) => {
    e.preventDefault();
    try {
      await axiosJwt.post(`/daftar/terima/${instansiId}`, inputMagang, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/admin/pengajuan");
    } catch (error) {
      console.error(error);
    }
  };

  let statePost = {
    inputUser,
    setInputUser,
    msg,
    setMsg,
    inputMagang,
    setInputMagang,
  };

  let handlePost = { tambahUser, terimaPelamar };

  return (
    <PostContext.Provider value={{ statePost, handlePost }}>
      {props.children}
    </PostContext.Provider>
  );
};
