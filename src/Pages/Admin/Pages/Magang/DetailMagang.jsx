import React, { useEffect, useContext } from "react";
import Title from "../../../../Components/Title";
import InformasiMagang from "./Components/InformasiMagang";
import InformasiSurat from "./Components/informasiSurat";
import InformasiPelamar from "./Components/InformasiPelamar";
import Button from "../../../../Components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InformasiInstansi from "./Components/InformasiInstansi";
import { GetContext } from "../../../../Context/GetContext";
import { UpdateContext } from "../../../../Context/UpdateContext";
import { Spinner } from "flowbite-react";

const DetailMagang = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { handleUpdate } = useContext(UpdateContext);

  const { magang, setMagang } = stateGet;
  const { getDataById, resetFormData } = handleGet;
  const { instansi, surat, pelamar, magangData, loading } = magang;
  const { updateStatusMagang } = handleUpdate;

  const { instansiId } = useParams();

  useEffect(() => {
    getDataById(instansiId);
  }, []);

  // Update Status dan Tgl Masuk, Tgl Selesai

  const handleUpdateStatusMagang = async (e) => {
    e.preventDefault();

    try {
      const response = await updateStatusMagang(e, instansi.id);
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

  return (
    <>
      <Title>Detail Magang</Title>
      <div className="flex justify-start items-center mt-5">
        <Button
          textColor="text-white"
          navigate="/admin/magang"
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
            <InformasiMagang
              instansiData={instansi}
              setInstansiData={(instansi) =>
                setMagang({
                  ...magang,
                  instansi: instansi,
                })
              }
              updateStatusMagang={handleUpdateStatusMagang}
              magangData={magangData}
              setMagangData={(magangData) =>
                setMagang({
                  ...magang,
                  magangData: magangData,
                })
              }
            />
            <InformasiInstansi instansiData={instansi} />
            <InformasiSurat suratData={surat} />

            {pelamar.map((data, index) => (
              <div
                className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 "
                key={data.id}
              >
                <InformasiPelamar index={index} data={data} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DetailMagang;
