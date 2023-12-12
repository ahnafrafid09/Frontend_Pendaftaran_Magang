import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { GetContext } from "./GetContext";
import { useNavigate } from "react-router-dom";

export const UpdateContext = createContext();

export const UpdateProvider = (props) => {
  const { globalContext } = useContext(GlobalContext);
  const { stateGet } = useContext(GetContext);

  const { axiosJwt, token } = globalContext;
  const { pengajuan, setPengajuan, magang, setMagang } = stateGet;
  const { surat, pelamar, instansi } = pengajuan;
  const [alasan, setAlasan] = useState({
    alasan_tolak: "",
  });
  const [msgFile, setMsgFile] = useState("");
  const navigate = useNavigate();

  const updatePelamar = async (e, pelamarId) => {
    e.preventDefault();
    const selectedPelamar = pelamar.find((pelamar) => pelamar.id === pelamarId);
    try {
      const response = await axiosJwt.patch(
        `/pelamar/${pelamarId}`,
        selectedPelamar,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const updateInstansi = async (e, instansiId) => {
    e.preventDefault();
    try {
      const response = await axiosJwt.patch(
        `/instansi/${instansiId}`,
        instansi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

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
    setPengajuan({
      ...pengajuan,
      surat: {
        ...pengajuan.surat,
        pdfFile: file,
      },
    });
  };

  const updateSurat = async (e, suratId) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("pdfFile", surat.pdfFile);
    formData.append("noSurat", surat.noSurat);
    formData.append("tglPengajuan", surat.tglPengajuan);

    try {
      const response = await axiosJwt.patch(`/surat/${suratId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const tolakPelamar = async (e, instansiId) => {
    e.preventDefault();
    try {
      await axiosJwt.patch(
        `/daftar/tolak/${instansiId}`,
        { alasan: alasan.alasan_tolak },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin/pengajuan");
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatusMagang = async (e, instansiId) => {
    e.preventDefault();

    try {
      const response = await axiosJwt.patch(
        `http://localhost:8000/api/instansi-magang/${instansiId}`,
        {
          status: magang.instansi.status,
          tglMasuk: magang.magangData.tglMasuk,
          tglSelesai: magang.magangData.tglSelesai,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await axiosJwt.patch(`/users/${userId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  let stateUpdate = { msgFile, alasan, setAlasan };

  let handleUpdate = {
    updatePelamar,
    updateInstansi,
    updateSurat,
    handleFileChange,
    tolakPelamar,
    updateStatusMagang,
  };

  return (
    <UpdateContext.Provider value={{ stateUpdate, handleUpdate }}>
      {props.children}
    </UpdateContext.Provider>
  );
};
