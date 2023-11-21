import React, { useState, useEffect } from "react";
import InformasiInstansi from "./Components/InformasiInstansi";
import InformasiPelamar from "./Components/InformasiPelamar";
import InformasiSurat from "./Components/InformasiSurat";
import Title from "../../../../Components/Title";
import DropdownInput from "../../../../Components/DropdownInput";
import TextInput from "../../../../Components/TextInput";
import DateInput from "../../../../Components/DateInput";
import Button from "../../../../Components/Button";
import {
  updatePelamar,
  updateInstansi,
  updateSurat,
  deletePelamar,
  Tolak,
  Terima,
  getDaftarById,
} from "../../../../libs/api";
import { Modal } from "flowbite-react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailPengajuan = () => {
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

  const [alasan, setAlasan] = useState("");
  const [pelamarData, setPelamarData] = useState([]);
  const [msgFile, setMsgFile] = useState("");
  const [msg, setMsg] = useState("");
  const [openModalTolak, setOpenModalTolak] = useState(false);
  const [openModalTerima, setOpenModalTerima] = useState(false);
  const { instansiId } = useParams();
  const navigate = useNavigate();

  // Ini Section useEffect
  useEffect(() => {
    getDaftar();
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

  const handleUpdatedPelamar = (e, pelamarId) => {
    e.preventDefault();
    const selectedPelamar = pelamarData.find(
      (pelamar) => pelamar.id === pelamarId
    );
    updatePelamar(pelamarId, selectedPelamar)
      .then((response) => {
        if (response) {
          toast.success(response.msg, {
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
      deletePelamar(pelamarId)
        .then((response) => {
          if (response) {
            toast.error(response.msg, {
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
  const handleUpdateInstansi = (e) => {
    e.preventDefault();
    updateInstansi(instansiData.id, instansiData)
      .then((response) => {
        if (response) {
          toast.success(response.msg, {
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
  const handleUpdatedSurat = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("pdfFile", suratData.pdfFile);
    formData.append("noSurat", suratData.noSurat);
    formData.append("tglPengajuan", suratData.tglPengajuan);

    updateSurat(suratData.id, formData)
      .then((response) => {
        if (response) {
          window.location.reload();
          toast.success(response.msg, {
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

  const getDaftar = async () => {
    try {
      const responseData = await getDaftarById(instansiId);

      if (responseData) {
        const { id, nama_instansi, alamat, kategori, status, surat, pelamars } =
          responseData;
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
        setPelamarData(pelamars);
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
      Tolak(instansiId, alasan);
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
      await Terima(instansiId, magangData);
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
        <InformasiInstansi
          dataInstansi={instansiData}
          handleUpdate={handleUpdateInstansi}
          setDataInstansi={setInstansiData}
        />
        <InformasiSurat
          msgFile={msgFile}
          handleFileChange={handleFileChange}
          suratData={suratData}
          setSuratData={setSuratData}
          handleUpdatedSurat={handleUpdatedSurat}
        />
        {pelamarData.map((data, index) => (
          <InformasiPelamar
            key={index}
            pelamarData={data}
            handleUpdatedPelamar={handleUpdatedPelamar}
            handlePelamarChange={handlePelamarChange}
            handlePelamarDelete={handlePelamarDelete}
          />
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
