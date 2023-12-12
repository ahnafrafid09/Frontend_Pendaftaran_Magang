import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);
  const [datasUser, setDatasUser] = useState([]);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [instansiData, setInstansiData] = useState({
    namaInstansi: "",
    alamatInstansi: "",
    kategori: "",
    status: "",
  });
  const [suratData, setSuratData] = useState({
    id: 0,
    pdfFile: null,
    noSurat: "",
    tglPengajuan: "",
  });
  const [magangData, setMagangData] = useState({
    tglMasuk: "",
    tglSelesai: "",
    bagian: "",
  });
  const [alasan, setAlasan] = useState({
    alasan_tolak: "",
  });
  const [pelamarData, setPelamarData] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgFile, setMsgFile] = useState("");
  const [msgForm, setMsgForm] = useState("");
  const [newPelamar, setNewPelamar] = useState({
    namaLengkap: "",
    alamat: "",
    email: "",
    noInduk: "",
    noTelp: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refreshToken();
    if (
      location.pathname.startsWith("/daftar") ||
      location.pathname.startsWith("/admin/pengajuan/daftar")
    ) {
      resetFormData();
    }
  }, [location.pathname]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExp(decoded.exp);
      setName(decoded.name);
      setRole(decoded.role);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJwt = axios.create({ baseURL: "http://localhost:8000/api" });
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
  const getPengajuanMagang = async () => {
    try {
      const response = await axiosJwt.get(
        `/daftar-menunggu?search_query=${keyword}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setDatas(data);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataMagang = async () => {
    try {
      const response = await axiosJwt.get(
        `/daftar-terima?search_query=${keyword}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setDatas(data);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataSelesai = async () => {
    try {
      const response = await axiosJwt.get(
        `/daftar-selesai?search_query=${keyword}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setDatas(data);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataById = async (instansiId) => {
    try {
      const response = await axiosJwt.get(`/daftar/${instansiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        const {
          id,
          nama_instansi,
          alamat,
          kategori,
          status,
          surat,
          pelamars,
          magang,
        } = response.data;

        setInstansiData({
          id,
          namaInstansi: nama_instansi,
          alamatInstansi: alamat,
          kategori,
          status,
        });
        setSuratData({
          id: surat.id,
          file: surat.fileName,
          url: surat.url,
          noSurat: surat.no_surat,
          tglPengajuan: surat.tanggal_pengajuan,
        });
        if (magang && magang.tanggal_masuk) {
          setMagangData({
            tglMasuk: magang.tanggal_masuk,
            tglSelesai: magang.tanggal_selesai,
            bagian: magang.bagian,
          });
        } else {
          setMagangData({
            tglMasuk: "",
            tglSelesai: "",
            bagian: "",
          });
        }
        setPelamarData(pelamars);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDataSelesaiById = async (instansiId) => {
    try {
      const response = await axiosJwt.get(`/daftar-selesai/${instansiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = response.data;
      console.log(result);
      if (result.status === "Selesai") {
        setInstansiData({
          namaInstansi: result.nama_instansi,
          alamatInstansi: result.alamat,
          kategori: result.kategori,
          status: result.status,
        });
        setSuratData({
          file: result.surat.file,
          url: result.surat.url,
          noSurat: result.surat.no_surat,
          tglPengajuan: result.surat.tanggal_pengajuan,
        });
        setPelamarData(result.pelamars);
        setMagangData({
          tglMasuk: result.magang.tanggal_masuk,
          tglSelesai: result.magang.tanggal_selesai,
        });
      } else if (result.alasan.alasan_tolak && result.status === "Ditolak") {
        setInstansiData({
          namaInstansi: result.nama_instansi,
          alamatInstansi: result.alamat,
          kategori: result.kategori,
          status: result.status,
        });
        setPelamarData(result.pelamars);
        setAlasan({ alasan_tolak: result.alasan.alasan_tolak ?? "" });
        setSuratData({
          file: result.surat.file,
          url: result.surat.url,
          noSurat: result.surat.no_surat,
          tglPengajuan: result.surat.tanggal_pengajuan,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const handleChangeSearchTerm = (e) => {
    const term = e.target.value;
    setQuery(term);
    setKeyword(term);
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
    setSuratData({
      ...suratData,
      pdfFile: file,
    });
  };

  const addPelamar = () => {
    if (
      newPelamar.namaLengkap &&
      newPelamar.alamat &&
      newPelamar.email &&
      newPelamar.noInduk &&
      newPelamar.noTelp
    ) {
      setPelamarData([...pelamarData, newPelamar]);
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

  const resetFormData = () => {
    setInstansiData({
      namaInstansi: "",
      alamatInstansi: "",
      kategori: "",
    });
    setSuratData({
      id: 0,
      pdfFile: null,
      noSurat: "",
      tglPengajuan: "",
    });
    setPelamarData([]);
    setNewPelamar({
      namaLengkap: "",
      alamat: "",
      email: "",
      noInduk: "",
      noTelp: "",
    });
    setMagangData({
      tglMasuk: "",
      tglSelesai: "",
      bagian: "",
    });
    setMsg("");
    setMsgFile("");
    setMsgForm("");
  };

  //   Daftar
  const tambahPengajuan = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Menambahkan data Instansi ke form data
    formData.append("namaInstansi", instansiData.namaInstansi);
    formData.append("alamatInstansi", instansiData.alamatInstansi);
    formData.append("kategori", instansiData.kategori);

    // Menambahkan data Surat ke form data
    formData.append("pdfFile", suratData.pdfFile);
    formData.append("noSurat", suratData.noSurat);
    formData.append("tglPengajuan", suratData.tglPengajuan);

    formData.append("pelamar", JSON.stringify(pelamarData));

    try {
      await axiosJwt.post("/daftar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      resetFormData();
      if (role === "admin") {
        navigate("/admin/pengajuan");
      } else if (role === "user") {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setMsgForm(error.response.data.msg);
      }
    }
  };

  // update daftar
  const updatePelamar = async (e, pelamarId) => {
    e.preventDefault();
    const selectedPelamar = pelamarData.find(
      (pelamar) => pelamar.id === pelamarId
    );
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
  const deletePelamar = async (e, pelamarId) => {
    e.preventDefault();

    try {
      const response = await axiosJwt.delete(`/pelamar/${pelamarId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        instansiData,
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

  const updateSurat = async (e, suratId) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("pdfFile", suratData.pdfFile);
    formData.append("noSurat", suratData.noSurat);
    formData.append("tglPengajuan", suratData.tglPengajuan);

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

  const updateStatusMagang = async (e, instansiId) => {
    e.preventDefault();
    try {
      const response = await axiosJwt.patch(
        `http://localhost:8000/api/instansi-magang/${instansiId}`,
        {
          status: instansiData.status,
          tglMasuk: magangData.tglMasuk,
          tglSelesai: magangData.tglSelesai,
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
    }
  };

  const tolakPelamar = async (e, instansiId) => {
    e.preventDefault();
    try {
      await axiosJwt.patch(
        `/daftar/tolak/${instansiId}`,
        { alasan },
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

  const terimaPelamar = async (e, instansiId) => {
    e.preventDefault();
    try {
      await axiosJwt.post(`/daftar/terima/${instansiId}`, magangData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/admin/pengajuan");
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axiosJwt.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
    } catch (error) {}
  };

  let globalContext = {
    axiosJwt,
    token,
    name,
    role,
  };

  let stateForGet = {
    data,
    setData,
  };

  let stateForGetAll = {
    datas,
    keyword,
    setKeyword,
    query,
    setQuery,
    page,
    setPage,
    pages,
    setPages,
    rows,
    setRows,
  };

  let stateForPost = {
    instansiData,
    setInstansiData,
    pelamarData,
    setPelamarData,
    newPelamar,
    setNewPelamar,
    suratData,
    setSuratData,
    magangData,
    setMagangData,
    setMsg,
    msg,
    msgForm,
    msgFile,
    alasan,
    setAlasan,
  };

  let handle = {
    getPengajuanMagang,
    getDataMagang,
    getDataSelesai,
    getDataById,
    getDataSelesaiById,
    changePage,
    handleChangeSearchTerm,
    handleFileChange,
    addPelamar,
    tambahPengajuan,
    updatePelamar,
    deletePelamar,
    updateInstansi,
    updateSurat,
    updateStatusMagang,
    tolakPelamar,
    terimaPelamar,
    getUser,
  };
  return (
    <GlobalContext.Provider
      value={{
        stateForGet,
        stateForGetAll,
        stateForPost,
        handle,
        globalContext,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
