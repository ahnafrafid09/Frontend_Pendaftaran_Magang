import React, { useState, useEffect, useContext } from "react";
import InformasiInstansi from "./Components/InformasiInstansi";
import InformasiPelamar from "./Components/InformasiPelamar";
import InformasiSurat from "./Components/InformasiSurat";
import Title from "../../../../Components/Title";
import DropdownInput from "../../../../Components/DropdownInput";
import TextInput from "../../../../Components/TextInput";
import DateInput from "../../../../Components/DateInput";
import Button from "../../../../Components/Button";
import { Modal, Spinner } from "flowbite-react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetContext } from "../../../../Context/GetContext";
import { DeleteContext } from "../../../../Context/DeleteContext";
import { UpdateContext } from "../../../../Context/UpdateContext";
import { GlobalContext } from "../../../../Context/GlobalContext";
import { PostContext } from "../../../../Context/PostContext";

const DetailPengajuan = () => {
  // const { handle, stateForPost } = useContext(GlobalContext);
  const { handleGet, stateGet } = useContext(GetContext);
  const { handleDelete } = useContext(DeleteContext);
  const { handleUpdate, stateUpdate } = useContext(UpdateContext);
  const { handlePost, statePost } = useContext(PostContext);

  const { pengajuan, setPengajuan } = stateGet;
  const { instansi, surat, pelamar, loading } = pengajuan;
  const { getDataById, resetFormData } = handleGet;
  const { deletePelamar } = handleDelete;
  const { setInputMagang, inputMagang, msg, setMsg } = statePost;
  const { terimaPelamar } = handlePost;
  const {
    updateInstansi,
    updatePelamar,
    updateSurat,
    handleFileChange,
    tolakPelamar,
  } = handleUpdate;
  const { msgFile, alasan, setAlasan } = stateUpdate;
  // const {
  //   updatePelamar,
  //   getDataById,
  //   deletePelamar,
  //   updateInstansi,
  //   handleFileChange,
  //   updateSurat,
  //   tolakPelamar,
  //   terimaPelamar,
  // } = handle;
  // const {
  //   instansiData,
  //   setInstansiData,
  //   suratData,
  //   setSuratData,
  //   pelamarData,
  //   setPelamarData,
  //   alasan,
  //   setAlasan,
  //   setMsg,
  //   msgFile,
  //   magangData,
  //   setMagangData,
  //   msg,
  // } = stateForPost;
  const [openModalTolak, setOpenModalTolak] = useState(false);
  const [openModalTerima, setOpenModalTerima] = useState(false);
  const { instansiId } = useParams();

  // Ini Section useEffect
  useEffect(() => {
    getDataById(instansiId);
  }, []);

  // Ini Section handle Pelamar
  const handlePelamarChange = (e, pelamarId) => {
    const updatedPelamarData = pelamar.map((pelamar) => {
      if (pelamar.id === pelamarId) {
        return {
          ...pelamar,
          [e.target.name]: e.target.value,
        };
      }
      return pelamar;
    });

    setPengajuan((prevPengajuan) => ({
      ...prevPengajuan,
      pelamar: updatedPelamarData,
    }));
  };
  const handleUpdatedPelamar = async (e, pelamarId) => {
    try {
      const response = await updatePelamar(e, pelamarId);
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
    } catch (error) {
      console.log(error);
    }
  };
  const handlePelamarDelete = async (e, pelamarId) => {
    try {
      if (pelamar.length > 1) {
        const response = await deletePelamar(e, pelamarId);
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
        setPengajuan.pelamar((prevPelamarData) =>
          prevPelamarData.filter((pelamar) => pelamar.id !== pelamarId)
        );
      } else {
        toast.error("Data Pelamar Hanya 1 Tidak Bisa Dihapus", {
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
    } catch (error) {
      console.log(error);
    }
  };

  // Ini Section Handle Instansi
  const handleUpdateInstansi = async (e) => {
    try {
      const response = await updateInstansi(e, instansiId);
      console.log(response);
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
    } catch (error) {
      console.log(error);
    }
  };

  // Ini Section Handle Surat
  const handleUpdatedSurat = async (e) => {
    try {
      const response = await updateSurat(e, surat.id);
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTolakPelamar = async (e) => {
    e.preventDefault();
    try {
      await tolakPelamar(e, instansiId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTerima = async (e) => {
    e.preventDefault();
    if (
      !inputMagang.tglMasuk ||
      !inputMagang.bagian ||
      !inputMagang.tglSelesai
    ) {
      setMsg("Harap Diisi Semua");
      return;
    } else {
      setMsg("");
    }
    try {
      await terimaPelamar(e, instansiId);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModalTerima = () => {
    setOpenModalTerima(false);
    setInputMagang({
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
          onClick={resetFormData}
          style="text-sm md:text-base lg:text-lg"
        >
          Kembali
        </Button>
      </div>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" size="lg" />
          <h1>Loading ...</h1>
        </div>
      ) : (
        <>
          <ToastContainer />
          <div className="flex flex-col justify-start gap-8 md:gap-4">
            <InformasiInstansi
              dataInstansi={instansi}
              handleUpdate={handleUpdateInstansi}
              setDataInstansi={(newInstansi) => {
                setPengajuan({
                  ...pengajuan,
                  instansi: newInstansi,
                });
              }}
            />
            <InformasiSurat
              msgFile={msgFile}
              handleFileChange={handleFileChange}
              suratData={surat}
              setSuratData={(newSurat) => {
                setPengajuan({
                  ...pengajuan,
                  surat: newSurat,
                });
              }}
              handleUpdatedSurat={handleUpdatedSurat}
            />
            {pelamar.map((data, index) => (
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
                        Isi Mulai Magang, Selesai Magang, dan Divisi Magang
                        Dibawah!
                      </h3>
                      <div className="flex flex-col md:flex-row items-center justify-around mt-10">
                        <DateInput
                          id="tanggalMulai"
                          label="Mulai Magang"
                          value={inputMagang.tglMasuk}
                          onChange={(e) =>
                            setInputMagang({
                              ...inputMagang,
                              tglMasuk: e.target.value,
                            })
                          }
                        />
                        <DateInput
                          id="tanggalSelesai"
                          label="Selesai Magang"
                          value={inputMagang.tglSelesai}
                          onChange={(e) =>
                            setInputMagang({
                              ...inputMagang,
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
                          value={inputMagang.bagian}
                          handleChange={(e) =>
                            setInputMagang({
                              ...inputMagang,
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
                          value={alasan.alasan_tolak}
                          onChange={(e) =>
                            setAlasan({
                              ...alasan,
                              alasan_tolak: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button
                          bgColor="bg-blue-800"
                          textColor="text-white"
                          paddingX="px-2.5"
                          paddingY="py-1.5"
                          onClick={handleTolakPelamar}
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
      )}
    </>
  );
};

export default DetailPengajuan;
