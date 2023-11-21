import React, { useState, useEffect } from "react";
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

const DetailHistory = () => {
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
  const [alasan, setAlasan] = useState({
    alasan_tolak: "",
  });
  const [pelamarData, setPelamarData] = useState([]);
  const { instansiId } = useParams();

  useEffect(() => {
    getDaftarById();
  }, []);

  const getDaftarById = async () => {
    try {
      const result = await getDaftarSelesaiById(instansiId);
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
      } else if (result.status === "Ditolak") {
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
      } else {
        console.error("data tidak ada");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          style="text-sm md:text-base lg:text-lg"
        >
          Kembali
        </Button>
      </div>
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
              value={instansiData.status}
            />
            {!alasan.alasan_tolak && instansiData.status === "Selesai" ? (
              <InformasiMagang magangData={magangData} />
            ) : (
              ""
            )}
          </div>
        </div>
        <InformasiInstansi instansiData={instansiData} />
        <InformasiSurat suratData={suratData} />
        {pelamarData.map((data, index) => (
          <InformasiPelamar data={data} index={index} />
        ))}
        {alasan.alasan_tolak && instansiData.status === "Ditolak" ? (
          <Catatan alasan={alasan} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DetailHistory;
