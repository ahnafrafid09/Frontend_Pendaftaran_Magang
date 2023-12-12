import React, { useContext } from "react";
import InformasiInstansi from "./Components/InformasiInstansi";
import InformasiSurat from "./Components/InformasiSurat";
import Title from "../../../../Components/Title";
import SubTitle from "../../../../Components/SubTitle";
import TextInput from "../../../../Components/TextInput";
import Button from "../../../../Components/Button";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { GlobalContext } from "../../../../Context/GlobalContext";

const TambahPengajuan = () => {
  const { handle, stateForPost } = useContext(GlobalContext);

  const {
    instansiData,
    setInstansiData,
    pelamarData,
    newPelamar,
    setNewPelamar,
    suratData,
    setSuratData,
    msg,
    msgForm,
    msgFile,
  } = stateForPost;

  const { handleFileChange, addPelamar, tambahPengajuan } = handle;

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
          style="text-sm md:text-base lg:text-lg"
        >
          Kembali
        </Button>
      </div>
      <div className="flex flex-col justify-start gap-8 md:gap-4">
        <InformasiInstansi
          dataInstansi={instansiData}
          setDataInstansi={setInstansiData}
        />
        <InformasiSurat
          handleFileChange={handleFileChange}
          suratData={suratData}
          msgFile={msgFile}
          setSuratData={setSuratData}
        />
        <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
          <SubTitle>Informasi Pelamar</SubTitle>
          <div className="mx-auto lg:mx-0 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-3 lg:flex lg:justify-between gap-4 lg:gap-0">
              <div className="">
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
              <div className="">
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
              <div className="">
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
            <div className="">
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
            <div className=" lg:justify-self-center">
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
      <div className="flex justify-end mt-5 md:flex md:justify-end">
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
        <div className="mt-8 overflow-x-auto">
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
                  <td className="border border-black  p-4">{index + 1}</td>
                  <td className="border border-black p-4">
                    {item.namaLengkap}
                  </td>
                  <td className="border border-black capitalize p-4">
                    {item.alamat}
                  </td>
                  <td className="border border-black p-4">{item.noTelp}</td>
                  <td className="border border-black p-4">{item.noInduk}</td>
                  <td className="border border-black p-4">{item.email}</td>
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
          onClick={tambahPengajuan}
        >
          Simpan Data
        </Button>
      </div>
    </>
  );
};

export default TambahPengajuan;
