import React from "react";
import TextInput from "../../../Components/TextInput";
import SubTitle from "../../../Components/SubTitle";

const InformasiMagang = ({ magangData, instansiData }) => {
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="flex items-center gap-3">
        <SubTitle>Informasi Surat</SubTitle>
      </div>
      <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
        {instansiData && (
          <TextInput
            id="status"
            label="Status"
            disabled={true}
            value={instansiData.status}
          />
        )}
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
      </div>
    </div>
  );
};

export default InformasiMagang;
