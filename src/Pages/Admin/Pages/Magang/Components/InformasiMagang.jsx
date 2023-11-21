import React from "react";
import SubTitle from "../../../../../Components/SubTitle";
import DropdownInput from "../../../../../Components/DropdownInput";
import DateInput from "../../../../../Components/DateInput";
import Button from "../../../../../Components/Button";

const InformasiMagang = ({
  instansiData,
  setInstansiData,
  magangData,
  setMagangData,
  updateStatusMagang,
}) => {
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="flex gap-2 items-center">
        <SubTitle>Informasi Magang</SubTitle>
      </div>
      <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
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
  );
};

export default InformasiMagang;
