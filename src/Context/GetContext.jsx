import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
export const GetContext = createContext();

export const GetProvider = (props) => {
  const { globalContext } = useContext(GlobalContext);
  const { axiosJwt, token } = globalContext;

  const [pengajuan, setPengajuan] = useState({
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
    loading: true,
  });
  const [magang, setMagang] = useState({
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
      file: "",
      tglPengajuan: "",
    },
    pelamar: [],
    magangData: {
      tglMasuk: "",
      tglSelesai: "",
      bagian: "",
    },
    loading: true,
  });
  const [history, setHistory] = useState({
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
      file: "",
      tglPengajuan: "",
    },
    pelamar: [],
    magangData: {
      tglMasuk: "",
      tglSelesai: "",
      bagian: "",
    },
    loading: true,
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    username: "",
    password: "",
    confPassword: "",
    loading: true,
  });
  const [dataPengajuan, setDataPengajuan] = useState({
    datas: [],
    pages: 0,
    limit: 10,
    page: 0,
    rows: 0,
    keyword: "",
    query: "",
    loading: true,
  });
  const [dataMagang, setDataMagang] = useState({
    datas: [],
    pages: 0,
    limit: 10,
    page: 0,
    rows: 0,
    keyword: "",
    query: "",
    loading: true,
  });
  const [dataHistory, setDataHistory] = useState({
    datas: [],
    pages: 0,
    limit: 10,
    page: 0,
    rows: 0,
    keyword: "",
    query: "",
    loading: true,
  });
  const [dataUser, setDataUser] = useState({
    datas: [],
    pages: 0,
    limit: 10,
    page: 0,
    rows: 0,
    keyword: "",
    query: "",
    loading: true,
  });

  const [alasan, setAlasan] = useState({
    alasan_tolak: "",
  });

  const resetFormData = () => {
    setAlasan({ alasan_tolak: "" });
    setHistory({
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
        file: "",
        tglPengajuan: "",
      },
      pelamar: [],
      magangData: {
        tglMasuk: "",
        tglSelesai: "",
        bagian: "",
      },
      loading: true,
    });
    setMagang({
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
        file: "",
        tglPengajuan: "",
      },
      pelamar: [],
      magangData: {
        tglMasuk: "",
        tglSelesai: "",
        bagian: "",
      },
      loading: true,
    });
    setPengajuan({
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
      loading: true,
    });
  };

  const getDataById = async (instansiId) => {
    try {
      const response = await axiosJwt.get(`/daftar/${instansiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = response.data;
      console.log(result);
      const {
        id,
        nama_instansi,
        alamat,
        status,
        kategori,
        surat,
        pelamars,
        magang,
      } = result;

      setPengajuan({
        instansi: {
          namaInstansi: nama_instansi,
          alamatInstansi: alamat,
          kategori,
          status,
        },
        surat: {
          id: surat.id,
          url: surat.url,
          noSurat: surat.no_surat,
          tglPengajuan: surat.tanggal_pengajuan,
        },
        pelamar: pelamars,
        loading: false,
      });
      setMagang({
        instansi: {
          id,
          namaInstansi: nama_instansi,
          alamatInstansi: alamat,
          kategori,
          status: status,
        },
        surat: {
          id: surat.id,
          url: surat.url,
          noSurat: surat.no_surat,
          tglPengajuan: surat.tanggal_pengajuan,
          file: surat.fileName,
        },
        pelamar: pelamars,
        magangData: {
          tglMasuk: magang.tanggal_masuk,
          tglSelesai: magang.tanggal_selesai,
          bagian: magang.bagian,
        },
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataSelesaiById = async (instansiId) => {
    try {
      const response = await axiosJwt.get(`/daftar-selesai/${instansiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = response.data;
      const {
        id,
        nama_instansi,
        alamat,
        status,
        kategori,
        surat,
        pelamars,
        magang,
        alasan,
      } = result;
      if (status === "Selesai") {
        setHistory({
          instansi: {
            id,
            namaInstansi: nama_instansi,
            alamatInstansi: alamat,
            status,
            kategori,
          },
          surat: {
            id: surat.id,
            url: surat.url,
            noSurat: surat.no_surat,
            tglPengajuan: surat.tanggal_pengajuan,
          },
          pelamar: pelamars,
          magang: {
            tglMasuk: magang.tanggal_masuk,
            tglSelesai: magang.tanggal_selesai,
          },
        });
      } else if (alasan.alasan_tolak && status === "Ditolak") {
        setHistory({
          instansi: {
            namaInstansi: nama_instansi,
            alamatInstansi: alamat,
            kategori: kategori,
            status: status,
          },
          pelamar: pelamars,
          surat: {
            file: surat.file,
            url: surat.url,
            noSurat: surat.no_surat,
            tglPengajuan: surat.tanggal_pengajuan,
          },
        });
        setAlasan({ alasan_tolak: alasan.alasan_tolak });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPengajuanMagang = async () => {
    try {
      const response = await axiosJwt.get(
        `/daftar-menunggu?search_query=${dataPengajuan.keyword}&page=${dataPengajuan.page}&limit=${dataPengajuan.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setDataPengajuan((prev) => ({
        ...prev,
        datas: data,
        page: response.data.page,
        pages: response.data.totalPage,
        rows: response.data.totalRows,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      setDataPengajuan((prev) => ({ ...prev, loading: false }));
    }
  };

  const getDataMagang = async () => {
    try {
      const response = await axiosJwt.get(
        `/daftar-terima?search_query=${dataMagang.keyword}&page=${dataMagang.page}&limit=${dataMagang.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setDataMagang((prev) => ({
        ...prev,
        datas: data,
        page: response.data.page,
        pages: response.data.totalPage,
        rows: response.data.totalRows,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      setDataMagang((prev) => ({ ...prev, loading: false }));
    }
  };

  const getDataHistory = async () => {
    try {
      const response = await axiosJwt.get(
        `/daftar-selesai?search_query=${dataHistory.keyword}&page=${dataHistory.page}&limit=${dataHistory.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setDataHistory((prev) => ({
        ...prev,
        datas: data,
        page: response.data.page,
        pages: response.data.totalPage,
        rows: response.data.totalRows,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      setDataHistory((prev) => ({ ...prev, loading: false }));
    }
  };

  const getDataUser = async () => {
    try {
      const response = await axiosJwt.get(
        `/users?search_query=${dataUser.keyword}&page=${dataUser.page}&limit=${dataUser.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      console.log(data);
      setDataUser((prev) => ({
        ...prev,
        datas: data,
        page: response.data.page,
        pages: response.data.totalPage,
        rows: response.data.totalRows,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      setDataUser((prev) => ({ ...prev, loading: false }));
    }
  };

  const getDataUserById = async (userId) => {
    try {
      const response = await axiosJwt.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const result = response.data;
      const { username, name, email, role } = result;
      setUser({
        name,
        email,
        username,
        role,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const changePage = ({ selected }, dataType) => {
    if (dataType === "dataPengajuan") {
      setDataPengajuan((prev) => ({ ...prev, page: selected }));
    } else if (dataType === "dataMagang") {
      setDataMagang((prev) => ({ ...prev, page: selected }));
    } else if (dataType === "dataHistory") {
      setDataHistory((prev) => ({ ...prev, page: selected }));
    } else if (dataType === "dataUser") {
      setDataUser((prev) => ({ ...prev, page: selected }));
    }
  };

  const handleChangeSearchTerm = (e, dataType) => {
    const term = e.target.value;
    if (dataType === "dataPengajuan") {
      setDataPengajuan((prev) => ({ ...prev, query: term, keyword: term }));
    } else if (dataType === "dataMagang") {
      setDataMagang((prev) => ({ ...prev, query: term, keyword: term }));
    } else if (dataType === "dataHistory") {
      setDataHistory((prev) => ({ ...prev, query: term, keyword: term }));
    } else if (dataType === "dataUser") {
      setDataUser((prev) => ({ ...prev, query: term, keyword: term }));
    }
  };

  let stateGet = {
    dataPengajuan,
    dataMagang,
    dataHistory,
    dataUser,
    pengajuan,
    setPengajuan,
    magang,
    setMagang,
    history,
    setHistory,
    alasan,
    user,
    setUser,
  };

  let handleGet = {
    changePage,
    handleChangeSearchTerm,
    getPengajuanMagang,
    getDataMagang,
    getDataHistory,
    getDataUser,
    getDataUserById,
    getDataById,
    getDataSelesaiById,
    resetFormData,
  };

  return (
    <GetContext.Provider value={{ stateGet, handleGet }}>
      {props.children}
    </GetContext.Provider>
  );
};