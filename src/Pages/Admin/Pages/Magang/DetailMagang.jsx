import React, { useState, useEffect } from "react";
import Title from "../../../../Components/Title";
import { getDaftarById, updateStatus } from "../../../../libs/api";
import InformasiMagang from "./Components/InformasiMagang";
import InformasiSurat from "./Components/informasiSurat";
import InformasiPelamar from "./Components/InformasiPelamar";
import Button from "../../../../Components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InformasiInstansi from "./Components/InformasiInstansi";

const DetailMagang = () => {
  const [instansiData, setInstansiData] = useState({
    id: "",
    namaInstansi: "",
    alamatInstansi: "",
    kategori: "",
    status: "",
  });
  const [magangData, setMagangData] = useState({
    tglMasuk: "",
    tglSelesai: "",
  });
  const [suratData, setSuratData] = useState({
    file: "",
    noSurat: "",
    tglPengajuan: "",
    url: "",
  });
  const [pelamarData, setPelamarData] = useState([]);
  const { instansiId } = useParams();

  useEffect(() => {
    getDaftar();
  }, []);

  const getDaftar = async () => {
    try {
      const responseData = await getDaftarById(instansiId);
      console.log(responseData);
      if (responseData) {
        const {
          id,
          nama_instansi,
          alamat,
          kategori,
          status,
          surat,
          pelamars,
          magang,
        } = responseData;
        setInstansiData({
          id,
          namaInstansi: nama_instansi,
          alamatInstansi: alamat,
          kategori,
          status,
        });
        setSuratData({
          file: surat.fileName,
          url: surat.url,
          noSurat: surat.no_surat,
          tglPengajuan: surat.tanggal_pengajuan,
        });
        setPelamarData(pelamars);
        setMagangData({
          tglMasuk: magang.tanggal_masuk,
          tglSelesai: magang.tanggal_selesai,
        });
      } else {
        console.error("data tidak ada");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update Status dan Tgl Masuk, Tgl Selesai

  const updateStatusMagang = async (e) => {
    e.preventDefault();
    try {
      const result = await updateStatus(
        instansiData.id,
        instansiData.status,
        magangData.tglMasuk,
        magangData.tglSelesai
      );
      if (result.success) {
        toast.success(result.message, {
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
          style="text-sm md:text-base lg:text-lg"
        >
          Kembali
        </Button>
      </div>
      <ToastContainer />
      <div className="flex flex-col justify-start gap-8 md:gap-4">
        <InformasiMagang
          instansiData={instansiData}
          setInstansiData={setInstansiData}
          updateStatusMagang={updateStatusMagang}
          magangData={magangData}
          setMagangData={setMagangData}
        />
        <InformasiInstansi instansiData={instansiData} />
        <InformasiSurat suratData={suratData} />

        {pelamarData.map((data, index) => (
          <div
            className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 "
            key={data.id}
          >
            <InformasiPelamar index={index} data={data} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailMagang;
