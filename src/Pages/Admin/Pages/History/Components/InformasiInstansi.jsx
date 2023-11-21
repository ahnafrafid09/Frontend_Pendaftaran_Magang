import React from "react";
import SubTitle from "../../../../../Components/SubTitle";
import TextInput from "../../../../../Components/TextInput";

const InformasiInstansi = ({ instansiData }) => {
  return (
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
  );
};

export default InformasiInstansi;
