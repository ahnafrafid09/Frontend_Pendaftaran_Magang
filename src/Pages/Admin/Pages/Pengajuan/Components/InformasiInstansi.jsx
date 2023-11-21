import React from "react";
import SubTitle from "../../../../../Components/SubTitle";
import Button from "../../../../../Components/Button";
import DropdownInput from "../../../../../Components/DropdownInput";
import TextInput from "../../../../../Components/TextInput";

const InformasiInstansi = ({ dataInstansi, handleUpdate, setDataInstansi }) => {
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="flex gap-2 items-center">
        <SubTitle>Informasi Instansi</SubTitle>
        {handleUpdate !== undefined ? (
          <Button
            bgColor="bg-primary-blue"
            textColor="text-white"
            paddingX="px-3"
            paddingY="py-0.5"
            onClick={handleUpdate}
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
        <DropdownInput
          options={["SMA/SMK", "Perguruan Tinggi", "Kategori Lainnya"]}
          title="Pilih Kategori"
          label="Pilih Kategori:"
          value={dataInstansi.kategori}
          handleChange={(e) =>
            setDataInstansi({ ...dataInstansi, kategori: e.target.value })
          }
        />
        <TextInput
          label="Nama Instansi"
          id="namaInstansi"
          placeHolder="Masukan Nama Instansi"
          value={dataInstansi.namaInstansi}
          onChange={(e) =>
            setDataInstansi({
              ...dataInstansi,
              namaInstansi: e.target.value,
            })
          }
        />
        <TextInput
          label="Alamat Instansi"
          id="alamatInstansi"
          placeHolder="Masukan Alamat Instansi"
          value={dataInstansi.alamatInstansi}
          onChange={(e) =>
            setDataInstansi({
              ...dataInstansi,
              alamatInstansi: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default InformasiInstansi;
