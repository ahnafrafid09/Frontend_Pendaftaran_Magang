import React, { useState, useEffect } from "react";
import Title from "../../../Components/Title";
import SubTitle from "../../../Components/SubTitle";
import DropdownInput from "../../../Components/DropdownInput";
import TextInput from "../../../Components/TextInput";
import DateInput from "../../../Components/DateInput";
import Button from "../../../Components/Button";
import { AiOutlineArrowLeft, AiOutlineFilePdf } from "react-icons/ai";
import { PiFilePdf } from "react-icons/pi";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
      const response = await axios.get(
        `http://localhost:8000/api/daftar-selesai/${instansiId}`
      );
      if (response.data.status === "Selesai") {
        setInstansiData({
          namaInstansi: response.data.nama_instansi,
          alamatInstansi: response.data.alamat,
          kategori: response.data.kategori,
          status: response.data.status,
        });
        setSuratData({
          file: response.data.surat.file,
          url: response.data.surat.url,
          noSurat: response.data.surat.no_surat,
          tglPengajuan: response.data.surat.tanggal_pengajuan,
        });
        setPelamarData(response.data.pelamars);
        setMagangData({
          tglMasuk: response.data.magang.tanggal_masuk,
          tglSelesai: response.data.magang.tanggal_selesai,
        });
      } else if (response.data.status === "Ditolak") {
        setInstansiData({
          namaInstansi: response.data.nama_instansi,
          alamatInstansi: response.data.alamat,
          kategori: response.data.kategori,
          status: response.data.status,
        });
        setPelamarData(response.data.pelamars);
        setAlasan({ alasan_tolak: response.data.alasan.alasan_tolak ?? "" });
        setSuratData({
          file: response.data.surat.file,
          url: response.data.surat.url,
          noSurat: response.data.surat.no_surat,
          tglPengajuan: response.data.surat.tanggal_pengajuan,
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
              <>
                <TextInput
                  id="tanggalMasuk"
                  label="Tanggal Masuk"
                  disabled={true}
                  value={magangData.tglMasuk}
                />
                <TextInput
                  id="tanggalSelesai"
                  label="Tanggal Selesai"
                  disabled={true}
                  value={magangData.tglSelesai}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
          <div className="flex gap-2 items-center">
            <SubTitle>Informasi Instansi</SubTitle>
          </div>
          <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
            <TextInput
              disabled={true}
              label="Kategori Instansi"
              value={instansiData.kategori}
            />
            <TextInput
              label="Nama Instansi"
              disabled={true}
              id="namaInstansi"
              value={instansiData.namaInstansi}
            />
            <TextInput
              label="Alamat Instansi"
              disabled={true}
              id="alamatInstansi"
              placeHolder="Masukan Alamat Instansi"
              value={instansiData.alamatInstansi}
            />
          </div>
        </div>
        <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
          <div className="flex items-center gap-3">
            <SubTitle>Informasi Surat</SubTitle>
          </div>

          <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
            <Link to={suratData.url} target="_blank">
              <div className="flex flex-col gap-y-2.5 border">
                <label className="font-lato font-bold">Surat Pengantar</label>
                <div className="flex gap-2 w-64 font-semibold items-center justify-center h-10 border border-netral-black rounded-md px-4">
                  <PiFilePdf size="24px" />
                  <p
                    className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"
                    title={suratData.file}
                  >
                    {suratData.file}
                  </p>
                </div>
              </div>
            </Link>
            <TextInput
              label="No Surat"
              disabled={true}
              id="noSurat"
              placeHolder="Masukan Nomor Surat"
              value={suratData.noSurat}
            />
            <TextInput
              id="tanggalPengajuan"
              label="Tanggal Pengajuan"
              disabled={true}
              value={suratData.tglPengajuan}
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
            </div>
            <div className="w-3/5 mx-auto lg:mx-0 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className=" lg:col-span-3 lg:flex lg:justify-between gap-4 lg:gap-0">
                <div>
                  <TextInput
                    label="Nama Lengkap"
                    disabled={true}
                    id={`namaLengkap ${index}`}
                    placeHolder="Masukan Nama Lengkap"
                    value={data.nama_lengkap}
                  />
                </div>
                <div>
                  <TextInput
                    label="Alamat"
                    id={`alamat ${index}`}
                    disabled={true}
                    placeHolder="Masukan Alamat"
                    value={data.alamat}
                  />
                </div>
                <div>
                  <TextInput
                    label="No Telepon"
                    id={`noTelepon ${index}`}
                    placeHolder="Masukan No Telepon"
                    disabled={true}
                    value={data.no_telepon}
                  />
                </div>
              </div>
              <div>
                <TextInput
                  label="No Induk"
                  disabled={true}
                  id={`noInduk ${index}`}
                  placeHolder="Masukan No Induk"
                  value={data.no_induk}
                />
              </div>
              <div className="lg:justify-self-center">
                <TextInput
                  label="Alamat Email"
                  id={`alamatEmail ${index}`}
                  type="email"
                  disabled={true}
                  placeHolder="Masukan Alamat Email"
                  value={data.email}
                />
              </div>
            </div>
          </div>
        ))}
        {alasan.alasan_tolak && instansiData.status === "Ditolak" ? (
          <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
            <div className="flex gap-2 items-center">
              <SubTitle>Catatan</SubTitle>
            </div>
            <div className="mt-4">
              <textarea
                name="Catatan"
                id="catatan"
                className="w-full bg-transparent h-28 py-5 px-6 border border-netral-black rounded"
              >
                {alasan.alasan_tolak}
              </textarea>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DetailHistory;
