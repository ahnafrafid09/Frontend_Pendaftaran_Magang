import React, { useState, useEffect } from "react";
import Title from "../../../Components/Title";
import SubTitle from "../../../Components/SubTitle";
import DropdownInput from "../../../Components/DropdownInput";
import TextInput from "../../../Components/TextInput";
import FileInput from "../../../Components/FileInput";
import DateInput from "../../../Components/DateInput";
import Button from "../../../Components/Button";
import { AiOutlineArrowLeft, AiOutlineFilePdf } from "react-icons/ai";
import { PiFilePdf } from "react-icons/pi";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
    getDaftarById();
  }, []);

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
      const response = await axios.patch(
        `http://localhost:8000/api/instansi-magang/${instansiData.id}`,
        {
          status: instansiData.status,
          tglMasuk: magangData.tglMasuk,
          tglSelesai: magangData.tglSelesai,
        }
      );
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
        >
          Kembali
        </Button>
      </div>
      <ToastContainer />
      <div className="flex flex-col justify-start gap-8">
        <div className="bg-blue-50 mt-5 rounded py-6 px-11">
          <div className="flex gap-2 items-center">
            <SubTitle>Informasi Magang</SubTitle>
          </div>
          <div className="flex justify-between items-center mt-4">
            <DropdownInput
              options={["Aktif", "Diterima", "Selesai"]}
              title="Pilih Status"
              label="Status"
              value={instansiData.status}
              handleChange={(e) =>
                setInstansiData({ ...instansiData, status: e.target.value })
              }
            />
            <DateInput
              label="Mulai Magang"
              id="tlgMasuk"
              placeHolder="Masukan Tgl Mulai Magang"
              value={magangData.tglMasuk}
              onChange={(e) =>
                setMagangData({ ...magangData, tglMasuk: e.target.value })
              }
            />
            <DateInput
              label="Selesai Magang"
              id="tglSelesai"
              placeHolder="Masukan Tgl Selesai Magang"
              value={magangData.tglSelesai}
              onChange={(e) =>
                setMagangData({ ...magangData, tglSelesai: e.target.value })
              }
            />
          </div>
          <div className="flex items-center mt-3">
            <Button
              bgColor="bg-primary-green"
              textColor="text-white"
              paddingX="px-2.5"
              paddingY="py-1.5"
              onClick={updateStatusMagang}
            >
              Simpan
            </Button>
          </div>
        </div>
        <div className="bg-blue-50 mt-5 rounded py-6 px-11">
          <div className="flex gap-2 items-center">
            <SubTitle>Informasi Instansi</SubTitle>
          </div>
          <div className="flex justify-between items-center mt-4">
            <TextInput
              disabled={true}
              title="Pilih Kategori"
              label="Pilih Kategori:"
              value={instansiData.kategori}
            />
            <TextInput
              label="Nama Instansi"
              disabled={true}
              id="namaInstansi"
              placeHolder="Masukan Nama Instansi"
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
        <div className="bg-blue-50 mt-5 rounded py-6 px-11">
          <div className="flex items-center gap-3">
            <SubTitle>Informasi Surat</SubTitle>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link to={suratData.url} target="_blank">
              <div className="flex flex-col gap-y-2.5 border">
                <label className="font-lato font-bold">Surat Pengantar</label>
                <div className="flex gap-2 font-semibold items-center justify-center h-10 border border-netral-black rounded-md px-4">
                  <PiFilePdf size="24px" />
                  <p className="text-sm"> {suratData.file}</p>
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
          <div className="bg-blue-50 mt-5 rounded py-6 px-11" key={data.id}>
            <div className="flex gap-3 items-center">
              <SubTitle>Informasi Pelamar</SubTitle>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="col-span-3 flex justify-between">
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
              <div className="justify-self-center">
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
      </div>
    </>
  );
};

export default DetailMagang;
