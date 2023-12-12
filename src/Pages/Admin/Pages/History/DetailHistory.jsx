import React, { useState, useEffect, useContext } from "react";
import { getDaftarSelesaiById } from "../../../../libs/api";
import InformasiMagang from "./Components/InformasiMagang";
import InformasiInstansi from "./Components/InformasiInstansi";
import InformasiSurat from "./Components/InformasiSurat";
import InformasiPelamar from "./Components/InformasiPelamar";
import Title from "../../../../Components/Title";
import SubTitle from "../../../../Components/SubTitle";
import TextInput from "../../../../Components/TextInput";
import Button from "../../../../Components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Catatan from "./Components/Catatan";
import { GlobalContext } from "../../../../Context/GlobalContext";
import { GetContext } from "../../../../Context/GetContext";
import { Spinner } from "flowbite-react";

const DetailHistory = () => {
  const { handle, stateForPost } = useContext(GlobalContext);
  const { handleGet, stateGet } = useContext(GetContext);
  const { getDataSelesaiById, resetFormData } = handleGet;
  const { history, setHistory, alasan } = stateGet;
  const { instansi, magang, surat, pelamar, loading } = history;

  // const {
  //   instansiData,
  //   setInstansiData,
  //   magangData,
  //   setMagangData,
  //   pelamarData,
  //   setPelamarData,
  //   suratData,
  //   setSuratData,
  //   alasan,
  //   setAlasan,
  // } = stateForPost;

  const { instansiId } = useParams();

  useEffect(() => {
    getDataSelesaiById(instansiId);
  }, []);

  return (
    <>
      <Title>Detail History Magang</Title>
      <div className="flex justify-start items-center mt-5">
        <Button
          textColor="text-white"
          navigate="/admin/history"
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
            <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
              <div className="flex gap-2 items-center">
                <SubTitle>Informasi Magang</SubTitle>
              </div>
              <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:justify-between md:flex-row items-center mt-4">
                <TextInput
                  id="tanggalPengajuan"
                  label="Tanggal Pengajuan"
                  disabled={true}
                  value={instansi.status}
                />

                {magang && instansi.status === "Selesai" ? (
                  <InformasiMagang magangData={magang} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <InformasiInstansi instansiData={instansi} />
            <InformasiSurat suratData={surat} />
            {pelamar.map((data, index) => (
              <InformasiPelamar data={data} index={index} />
            ))}
            {alasan.alasan_tolak !== null && instansi.status === "Ditolak" ? (
              <Catatan alasan={alasan} />
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DetailHistory;
