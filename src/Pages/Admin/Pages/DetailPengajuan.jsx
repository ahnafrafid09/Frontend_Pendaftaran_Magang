import React, { useState, useEffect } from "react";
import Title from "../../../Components/Title";
import SubTitle from "../../../Components/SubTitle";
import DropdownInput from "../../../Components/DropdownInput";
import TextInput from "../../../Components/TextInput";
import FileInput from "../../../Components/FileInput";
import DateInput from "../../../Components/DateInput";
import Button from "../../../Components/Button";
import { Modal } from "flowbite-react";
import { AiOutlineArrowLeft, AiOutlineFilePdf } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DetailPengajuan = () => {
  // Ini Section State
  const [instansiData, setInstansiData] = useState({
    id: "",
    namaInstansi: "",
    alamatInstansi: "",
    kategori: "",
  });
  const [suratData, setSuratData] = useState({
    id: "",
    pdfFile: null,
    noSurat: "",
    tglPengajuan: "",
    url: "",
  });

  const [magangData, setMagangData] = useState({
    tglMasuk: "",
    tglSelesai: "",
    bagian: "",
  });

  const [alasan, setAlasan] = useState([]);
  const [pelamarData, setPelamarData] = useState([]);
  const [msgFile, setMsgFile] = useState("");
  const [msg, setMsg] = useState("");
  const [openModalTolak, setOpenModalTolak] = useState(false);
  const [openModalTerima, setOpenModalTerima] = useState(false);
  const { instansiId } = useParams();
  const navigate = useNavigate();

  // Ini Section useEffect
  useEffect(() => {
    getDaftarById();
  }, []);

  // Ini Section handle Pelamar
  const handlePelamarChange = (e, pelamarId) => {
    const updatedPelamarData = pelamarData.map((pelamar) => {
      if (pelamar.id === pelamarId) {
        return {
          ...pelamar,
          [e.target.name]: e.target.value,
        };
      }
      return pelamar;
    });

    setPelamarData(updatedPelamarData);
  };

  const updatedPelamar = (e, pelamarId) => {
    e.preventDefault();
    const selectedPelamar = pelamarData.find(
      (pelamar) => pelamar.id === pelamarId
    );
    axios
      .patch(`http://localhost:8000/api/pelamar/${pelamarId}`, selectedPelamar)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };
  const handlePelamarDelete = (e, pelamarId) => {
    e.preventDefault();

    if (pelamarData.length > 1) {
      axios
        .delete(`http://localhost:8000/api/pelamar/${pelamarId}`)
        .then((response) => {
          if (response.status === 200) {
            toast.error(response.data.msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          setPelamarData((prevPelamarData) =>
            prevPelamarData.filter((pelamar) => pelamar.id !== pelamarId)
          );
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
  };

  // Ini Section Handle Instansi
  const updateInstansi = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:8000/api/instansi/${instansiData.id}`,
        instansiData
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

  // Ini Section Handle Surat
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
  const updateSurat = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("pdfFile", suratData.pdfFile);
    formData.append("noSurat", suratData.noSurat);
    formData.append("tglPengajuan", suratData.tglPengajuan);

    axios
      .patch(`http://localhost:8000/api/surat/${suratData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();

          toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

  const getDaftarById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/daftar/${instansiId}`
      );
      console.log(response.data);
      if (response.data) {
        setInstansiData({
          id: response.data.id,
          namaInstansi: response.data.nama_instansi,
          alamatInstansi: response.data.alamat,
          kategori: response.data.kategori,
        });
        setSuratData({
          id: response.data.surat.id,
          pdfFile: response.data.surat.file,
          url: response.data.surat.url,
          noSurat: response.data.surat.no_surat,
          tglPengajuan: response.data.surat.tanggal_pengajuan,
        });
        setPelamarData(response.data.pelamars);
      } else {
        console.error("data tidak ada");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // handle modal
  const handleTolak = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `http://localhost:8000/api/daftar/tolak/${instansiId}`,
        { alasan: alasan }
      );
      navigate("/admin/pengajuan");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTerima = async (e) => {
    e.preventDefault();
    if (!magangData.tglMasuk || !magangData.bagian || !magangData.tglSelesai) {
      setMsg("Harap Diisi Semua");
      return;
    } else {
      setMsg("");
    }
    try {
      await axios.post(
        `http://localhost:8000/api/daftar/terima/${instansiId}`,
        magangData
      );
      navigate("/admin/pengajuan");
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModalTerima = () => {
    setOpenModalTerima(false);
    setMagangData({
      tglMasuk: "",
      tglSelesai: "",
      bagian: "",
    });
  };

  return (
    <>
      <Title>Detail Pengajuan Magang</Title>
      <div className="flex justify-start items-center mt-5">
        <Button
          textColor="text-white"
          navigate="/admin/pengajuan"
          icon={<AiOutlineArrowLeft />}
          bgColor="bg-primary-blue"
          paddingY="py-2"
          paddingX="px-2.5"
          style="text-sm md:text-base lg:text-lg"
        >
          Kembali
        </Button>
      </div>
      <ToastContainer />
      <div className="flex flex-col justify-start gap-8 md:gap-4">
        <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
          <div className="flex gap-2 items-center">
            <SubTitle>Informasi Instansi</SubTitle>
            <Button
              bgColor="bg-primary-blue"
              textColor="text-white"
              paddingX="px-3"
              paddingY="py-0.5"
              onClick={updateInstansi}
            >
              Edit
            </Button>
          </div>
          <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
            <DropdownInput
              options={["SMA/SMK", "Perguruan Tinggi", "Kategori Lainnya"]}
              title="Pilih Kategori"
              label="Pilih Kategori:"
              value={instansiData.kategori}
              handleChange={(e) =>
                setInstansiData({ ...instansiData, kategori: e.target.value })
              }
            />
            <TextInput
              label="Nama Instansi"
              id="namaInstansi"
              placeHolder="Masukan Nama Instansi"
              value={instansiData.namaInstansi}
              onChange={(e) =>
                setInstansiData({
                  ...instansiData,
                  namaInstansi: e.target.value,
                })
              }
            />
            <TextInput
              label="Alamat Instansi"
              id="alamatInstansi"
              placeHolder="Masukan Alamat Instansi"
              value={instansiData.alamatInstansi}
              onChange={(e) =>
                setInstansiData({
                  ...instansiData,
                  alamatInstansi: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
          <div className="flex items-center gap-3">
            <SubTitle>Informasi Surat</SubTitle>
            <p className="text-error font-bold font-roboto">{msgFile}</p>
            <Button
              bgColor="bg-primary-blue"
              textColor="text-white"
              paddingX="px-3"
              paddingY="py-0.5"
              onClick={updateSurat}
            >
              Edit
            </Button>
          </div>
          <div className="w-24 mt-3">
            <Button
              bgColor="bg-blue-900"
              paddingX="px-2"
              paddingY="py-1"
              textColor="text-white"
              navigate={suratData.url}
              target="_blank"
            >
              Buka File
            </Button>
          </div>
          <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
            <FileInput
              label="Unggah Perubahan Surat (Opsional)"
              id="berkas"
              onChange={handleFileChange}
            />
            <TextInput
              label="No Surat"
              id="noSurat"
              placeHolder="Masukan Nomor Surat"
              value={suratData.noSurat}
              onChange={(e) =>
                setSuratData({ ...suratData, noSurat: e.target.value })
              }
            />
            <DateInput
              id="tanggalPengajuan"
              label="Tanggal Pengajuan"
              value={suratData.tglPengajuan}
              onChange={(e) =>
                setSuratData({ ...suratData, tglPengajuan: e.target.value })
              }
            />
          </div>
        </div>
        {pelamarData.map((data, index) => (
          <div
            className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 "
            key={data.id}
          >
            <div className="flex gap-3 items-center">
              <SubTitle>Informasi Pelamar</SubTitle>
              <Button
                bgColor="bg-primary-blue"
                textColor="text-white"
                paddingX="px-3"
                paddingY="py-0.5"
                onClick={(e) => updatedPelamar(e, data.id)}
              >
                Edit
              </Button>
            </div>
            <div className="w-3/5 mx-auto lg:mx-0 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className=" lg:col-span-3 lg:flex lg:justify-between gap-4 lg:gap-0">
                <div>
                  <TextInput
                    label="Nama Lengkap"
                    id={`namaLengkap ${index}`}
                    placeHolder="Masukan Nama Lengkap"
                    name="nama_lengkap"
                    value={data.nama_lengkap}
                    onChange={(e) => handlePelamarChange(e, data.id)}
                  />
                </div>
                <div>
                  <TextInput
                    label="Alamat"
                    id={`alamat ${index}`}
                    name="alamat"
                    placeHolder="Masukan Alamat"
                    value={data.alamat}
                    onChange={(e) => handlePelamarChange(e, data.id)}
                  />
                </div>
                <div>
                  <TextInput
                    label="No Telepon"
                    id={`noTelepon ${index}`}
                    name="no_telepon"
                    placeHolder="Masukan No Telepon"
                    value={data.no_telepon}
                    onChange={(e) => handlePelamarChange(e, data.id)}
                  />
                </div>
              </div>
              <div>
                <TextInput
                  label="No Induk"
                  id={`noInduk ${index}`}
                  name="no_induk"
                  placeHolder="Masukan No Induk"
                  value={data.no_induk}
                  onChange={(e) => handlePelamarChange(e, data.id)}
                />
              </div>
              <div className="lg:justify-self-center">
                <TextInput
                  label="Alamat Email"
                  id={`alamatEmail ${index}`}
                  type="email"
                  name="email"
                  placeHolder="Masukan Alamat Email"
                  value={data.email}
                  onChange={(e) => handlePelamarChange(e, data.id)}
                />
              </div>
              {pelamarData.length > 1 && (
                <div className="justify-self-end self-end">
                  <Button
                    bgColor="bg-error"
                    textColor="text-white"
                    paddingX="px-4"
                    paddingY="py-2"
                    onClick={(e) => handlePelamarDelete(e, data.id)}
                  >
                    Hapus Pelamar
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="w-full md:w-1/2">
            <Button
              bgColor="bg-green-800"
              paddingY="py-4"
              paddingX="px-36"
              textColor="text-white"
              style="font-bold text-xl"
              onClick={() => setOpenModalTerima(true)}
            >
              Terima
            </Button>
            <Modal
              show={openModalTerima}
              size="7xl"
              onClose={onCloseModalTerima}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-warning" />
                  <h3 className="mb-5 text-lg font-roboto text-netral-black ">
                    Isi Mulai Magang, Selesai Magang, dan Divisi Magang Dibawah!
                  </h3>
                  <div className="flex flex-col md:flex-row items-center justify-around mt-10">
                    <DateInput
                      id="tanggalMulai"
                      label="Mulai Magang"
                      value={magangData.tglMasuk}
                      onChange={(e) =>
                        setMagangData({
                          ...magangData,
                          tglMasuk: e.target.value,
                        })
                      }
                    />
                    <DateInput
                      id="tanggalSelesai"
                      label="Selesai Magang"
                      value={magangData.tglSelesai}
                      onChange={(e) =>
                        setMagangData({
                          ...magangData,
                          tglSelesai: e.target.value,
                        })
                      }
                    />
                    <DropdownInput
                      options={[
                        "Sekretariat",
                        "Statistik",
                        "Aptika",
                        "IKP",
                        "Sandikami",
                        "E-gov",
                        "JDS",
                      ]}
                      title="Pilih Divisi"
                      label="Pilih Divisi:"
                      value={magangData.bagian}
                      handleChange={(e) =>
                        setMagangData({
                          ...magangData,
                          bagian: e.target.value,
                        })
                      }
                    />
                  </div>
                  <p className="text-error font-bold font-roboto">{msg}</p>
                  <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                    <Button
                      bgColor="bg-blue-800"
                      textColor="text-white"
                      paddingX="px-28"
                      paddingY="py-1.5"
                      onClick={handleTerima}
                    >
                      Konfirmasi
                    </Button>
                    <Button
                      bgColor="bg-error"
                      textColor="text-white"
                      paddingX="px-28"
                      paddingY="py-1.5"
                      onClick={() => setOpenModalTerima(false)}
                    >
                      Batalkan
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <div className="w-full md:w-1/2">
            <Button
              bgColor="bg-error"
              paddingY="py-4"
              paddingX="px-36"
              textColor="text-white"
              style="font-bold text-xl"
              onClick={() => setOpenModalTolak(true)}
            >
              Tolak
            </Button>
            <Modal
              show={openModalTolak}
              size="md"
              onClose={() => setOpenModalTolak(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-warning" />
                  <h3 className="mb-5 text-lg font-roboto text-netral-black ">
                    Anda Yakin Ingin Menolak Pengajuan Ini?
                  </h3>
                  <div className="my-4 flex justify-center items-center">
                    <TextInput
                      label="Masukan Alasan"
                      id="alasan"
                      placeHolder="Masukan Alasan Menolak"
                      value={alasan}
                      onChange={(e) => setAlasan(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      bgColor="bg-blue-800"
                      textColor="text-white"
                      paddingX="px-2.5"
                      paddingY="py-1.5"
                      onClick={handleTolak}
                    >
                      Konfirmasi
                    </Button>
                    <Button
                      bgColor="bg-error"
                      textColor="text-white"
                      paddingX="px-2.5"
                      paddingY="py-1.5"
                      onClick={() => setOpenModalTolak(false)}
                    >
                      Batalkan
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPengajuan;
