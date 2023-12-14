import React, { createContext, useState, useEffect, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";
import { GetContext } from "./GetContext";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const { globalContext } = useContext(GlobalContext);
  const { axiosJwt, token, role } = globalContext;
  const { handleGet } = useContext(GetContext);
  const { getDataUser } = handleGet;
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgFile, setMsgFile] = useState("");
  const [inputPengajuan, setInputPengajuan] = useState({
    instansi: {
      namaInstansi: "",
      alamatInstansi: "",
      kategori: "",
      status: "",
    },
    surat: {
      pdfFile: null,
      noSurat: "",
      url: "",
      tglPengajuan: "",
    },
    pelamar: [],
  });
  const [newPelamar, setNewPelamar] = useState({
    namaLengkap: "",
    alamat: "",
    email: "",
    noInduk: "",
    noTelp: "",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.toLowerCase().endsWith(".pdf")) {
      setMsgFile("Ekstensi file harus PDF");
      e.target.value = "";
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setMsgFile("Ukuran file harus kurang dari 5MB");
      e.target.value = "";
      return;
    }
    setMsgFile("");
    setInputPengajuan((prevInputPengajuan) => ({
      ...prevInputPengajuan,
      surat: {
        ...prevInputPengajuan.surat,
        pdfFile: file,
      },
    }));
  };

  const addPelamar = () => {
    if (
      newPelamar.namaLengkap &&
      newPelamar.alamat &&
      newPelamar.email &&
      newPelamar.noInduk &&
      newPelamar.noTelp
    ) {
      setInputPengajuan((prevInputPengajuan) => ({
        ...prevInputPengajuan,
        pelamar: [...prevInputPengajuan.pelamar, newPelamar],
      }));
      setNewPelamar({
        namaLengkap: "",
        alamat: "",
        email: "",
        noInduk: "",
        noTelp: "",
      });
      setMsg("");
    } else {
      setMsg("Harap isi semua kolom data pelamar");
    }
  };

  const daftar = async (e) => {
    e.preventDefault();

    e.preventDefault();
    const formData = new FormData();

    // Menambahkan data Instansi ke form data
    formData.append("namaInstansi", inputPengajuan.instansi.namaInstansi);
    formData.append("alamatInstansi", inputPengajuan.instansi.alamatInstansi);
    formData.append("kategori", inputPengajuan.instansi.kategori);

    // Menambahkan data Surat ke form data
    formData.append("pdfFile", inputPengajuan.surat.pdfFile);
    formData.append("noSurat", inputPengajuan.surat.noSurat);
    formData.append("tglPengajuan", inputPengajuan.surat.tglPengajuan);

    formData.append("pelamar", JSON.stringify(inputPengajuan.pelamar));

    try {
      await axiosJwt.post("/user/daftar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (role === "admin") {
        navigate("/admin/pengajuan");
      } else if (role === "user") {
        navigate("/pengajuan");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

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
      if (response === 201) {
        getDataUser();
      }
      return response;
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const terimaPelamar = async (e, instansiId) => {
    e.preventDefault();
    try {
      await axiosJwt.post(`/admin/daftar/terima/${instansiId}`, inputMagang, {
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
    inputPengajuan,
    setInputPengajuan,
    msgFile,
    setMsgFile,
    newPelamar,
    setNewPelamar,
  };

  let handlePost = {
    tambahUser,
    terimaPelamar,
    daftar,
    handleFileChange,
    addPelamar,
  };

  return (
    <PostContext.Provider value={{ statePost, handlePost }}>
      {props.children}
    </PostContext.Provider>
  );
};
