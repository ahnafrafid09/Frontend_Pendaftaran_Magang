import React from "react";
import SubTitle from "../../../../../Components/SubTitle";
import TextInput from "../../../../../Components/TextInput";

const InformasiPelamar = ({ data, index }) => {
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 " key={data.id}>
      <div className="flex gap-3 items-center">
        <SubTitle>Informasi Pelamar</SubTitle>
      </div>
      <div className="mx-auto lg:mx-0 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
  );
};

export default InformasiPelamar;
