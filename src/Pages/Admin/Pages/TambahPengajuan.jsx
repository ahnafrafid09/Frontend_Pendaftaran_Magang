import React, { useState } from "react";
import Title from "../../../Components/Title";
import SubTitle from "../../../Components/SubTitle";
import DropdownInput from "../../../Components/DropdownInput";
import TextInput from "../../../Components/TextInput";
import FileInput from "../../../Components/FileInput";
import DateInput from "../../../Components/DateInput";
import Button from "../../../Components/Button";
import axios from "axios";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TambahPengajuan = () => {
  const [instansiData, setInstansiData] = useState({
    namaInstansi: "",
    alamatInstansi: "",
    kategori: "",
  });
  const [suratData, setSuratData] = useState({
    pdfFile: null,
    noSurat: "",
    tglPengajuan: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
      !instansiData.namaInstansi ||
      !instansiData.alamatInstansi ||
      !instansiData.kategori ||
      !suratData.noSurat ||
      !suratData.tglPengajuan ||
      pelamarData.length < 0
    ) {
      setMsgForm("Harap Isi Semua Pertanyaan");
      return;
    }
    if (!suratData.pdfFile) {
      setMsgForm("Harap unggah file surat sebelum mengirimkan data");
      return;
    }

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
      await axios.post("http://localhost:8000/api/daftar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/pengajuan");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Title>Tambah Pengajuan Magang</Title>
      <div className="flex justify-start items-center mt-5">
        <Button
          textColor="text-white"
          navigate="/admin/pengajuan"
          icon={<AiOutlineArrowLeft />}
          bgColor="bg-primary-blue"
          paddingY="py-2"
          paddingX="px-2.5"
        >
          Kembali
        </Button>
      </div>

      <div className="flex flex-col justify-start gap-8">
        <div className="bg-blue-50 mt-5 rounded py-6 px-11">
          <SubTitle>Informasi Instansi</SubTitle>
          <div className="flex justify-between items-center mt-4">
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
        <div className="bg-blue-50 mt-5 rounded py-6 px-11">
          <SubTitle>Informasi Instansi</SubTitle>
          <p className="text-error font-bold font-roboto">{msgFile}</p>
          <div className="flex justify-between items-center mt-4">
            <FileInput
              label="Unggah Surat Pengantar"
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
        <div className="bg-blue-50 mt-5 rounded py-6 px-11">
          <SubTitle>Informasi Pelamar</SubTitle>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="col-span-3 flex justify-between">
              <div>
                <TextInput
                  label="Nama Lengkap"
                  id="namaLengkap"
                  placeHolder="Masukan Nama Lengkap"
                  value={newPelamar.namaLengkap}
                  onChange={(e) =>
                    setNewPelamar({
                      ...newPelamar,
                      namaLengkap: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <TextInput
                  label="Alamat"
                  id="alamat"
                  placeHolder="Masukan Alamat"
                  value={newPelamar.alamat}
                  onChange={(e) =>
                    setNewPelamar({
                      ...newPelamar,
                      alamat: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <TextInput
                  label="No Telepon"
                  id="noTelepon"
                  placeHolder="Masukan No Telepon"
                  value={newPelamar.noTelp}
                  onChange={(e) =>
                    setNewPelamar({
                      ...newPelamar,
                      noTelp: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <TextInput
                label="No Induk"
                id="noInduk"
                placeHolder="Masukan No Induk"
                value={newPelamar.noInduk}
                onChange={(e) =>
                  setNewPelamar({
                    ...newPelamar,
                    noInduk: e.target.value,
                  })
                }
              />
            </div>

            <div className="justify-self-center">
              <TextInput
                label="Alamat Email"
                id="alamatEmail"
                placeHolder="Masukan Alamat Email"
                value={newPelamar.email}
                onChange={(e) =>
                  setNewPelamar({ ...newPelamar, email: e.target.value })
                }
              />
            </div>
          </div>
          <p className="text-error font-bold font-roboto">{msg}</p>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button
          icon={<AiOutlinePlus />}
          bgColor="bg-primary-blue"
          paddingY="py-2"
          paddingX="px-2.5"
          textColor="text-white"
          onClick={addPelamar}
        >
          Tambah Pelamar
        </Button>
      </div>
      {pelamarData.length > 0 ? (
        <div className="mt-8">
          <table className="table-auto w-full border border-black font-lato">
            <thead className="border border-black bg-blue-100">
              <tr>
                <th className="border border-black py-4">No</th>
                <th className="border border-black py-4">Nama Lengkap</th>
                <th className="border border-black py-4">Alamat</th>
                <th className="border border-black py-4">Nomor Telepon</th>
                <th className="border border-black py-4">Nomor Induk</th>
                <th className="border border-black py-4">Alamat Email</th>
              </tr>
            </thead>
            <tbody>
              {pelamarData.map((item, index) => (
                <tr className="text-center bg-white" key={index}>
                  <td className="border border-black p-4">{index + 1}</td>
                  <td className="border border-black">{item.namaLengkap}</td>
                  <td className="border border-black capitalize">
                    {item.alamat}
                  </td>
                  <td className="border border-black">{item.noTelp}</td>
                  <td className="border border-black">{item.noInduk}</td>
                  <td className="border border-black">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      <div className="mt-5">
        <p className="text-center text-error mt-5 mb-5 font-bold font-roboto">
          {msgForm}
        </p>
        <Button
          bgColor="bg-green-700"
          paddingY="py-3"
          paddingX="px-2"
          textColor="text-white text-2xl font-medium"
          onClick={handleSubmit}
        >
          Simpan Data
        </Button>
      </div>
    </>
  );
};

export default TambahPengajuan;
