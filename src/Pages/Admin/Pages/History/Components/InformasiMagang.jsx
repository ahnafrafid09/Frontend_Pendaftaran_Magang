import React from "react";
import TextInput from "../../../../../Components/TextInput";

const InformasiMagang = ({ magangData }) => {
  return (
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
  );
};

export default InformasiMagang;
