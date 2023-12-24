import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { GetContext } from "./GetContext";
import { useNavigate } from "react-router-dom";

export const UpdateContext = createContext();

export const UpdateProvider = (props) => {
  const { globalContext } = useContext(GlobalContext);
  const { stateGet, handleGet } = useContext(GetContext);

  const { axiosJwt, token } = globalContext;
  const { pengajuan, setPengajuan, magang, akun, inputNewPassword } = stateGet;
  const { getDataUser } = handleGet;
  const { surat, pelamar, instansi } = pengajuan;
  const [alasan, setAlasan] = useState({
    alasan_tolak: "",
  });
  const [msgFile, setMsgFile] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confNewPassword: "",
  });
  const updatePelamar = async (e, pelamarId) => {
    e.preventDefault();
    const selectedPelamar = pelamar.find((pelamar) => pelamar.id === pelamarId);
    try {
      const response = await axiosJwt.patch(
        `/admin/pelamar/${pelamarId}`,
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
        `/admin/instansi/${instansiId}`,
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
      const response = await axiosJwt.patch(
        `/admin/surat/${suratId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const tolakPelamar = async (e, instansiId) => {
    e.preventDefault();
    try {
      await axiosJwt.patch(
        `/admin/daftar/tolak/${instansiId}`,
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
        `/admin/instansi-magang/${instansiId}`,
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
      if (response === 200) {
        getDataUser();
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await axiosJwt.patch(
        `/admin/user/${userId}`,
        {
          name: akun.user.name,
          email: akun.user.email,
          username: akun.user.username,
          role: akun.user.role,
          password: inputNewPassword.newPassword,
          confNewPassword: inputNewPassword.confNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getDataUser();
      return response;
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJwt.patch(
        "/user/change-password/",
        changePassword,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.msg) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("An error occurred while updating the password");
      }
    }
  };

  let stateUpdate = {
    msgFile,
    alasan,
    setAlasan,
    msg,
    setMsg,
    changePassword,
    setChangePassword,
  };

  let handleUpdate = {
    updatePelamar,
    updateInstansi,
    updateSurat,
    handleFileChange,
    tolakPelamar,
    updateStatusMagang,
    updateUser,
    updatePassword,
  };

  return (
    <UpdateContext.Provider value={{ stateUpdate, handleUpdate }}>
      {props.children}
    </UpdateContext.Provider>
  );
};
