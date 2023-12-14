import React from "react";
import SubTitle from "../../../../../Components/SubTitle";
import Button from "../../../../../Components/Button";
import TextInput from "../../../../../Components/TextInput";

const InformasiPelamar = ({
  pelamarData,
  handleUpdatedPelamar,
  handlePelamarChange,
  handlePelamarDelete,
}) => {
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="flex gap-3 items-center">
        <SubTitle>Informasi Pelamar</SubTitle>
        {handleUpdatedPelamar !== undefined ? (
          <Button
            bgColor="bg-primary-blue"
            textColor="text-white"
            paddingX="px-3"
            paddingY="py-0.5"
            onClick={(e) => handleUpdatedPelamar(e, pelamarData.id)}
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="mx-auto lg:mx-0 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-items-center md:justify-items-stretch">
        <div className=" lg:col-span-3 lg:flex lg:justify-between gap-4 lg:gap-0">
          <div>
            <TextInput
              label="Nama Lengkap"
              id={`namaLengkap ${pelamarData.id}`}
              placeHolder="Masukan Nama Lengkap"
              name="nama_lengkap"
              value={pelamarData.nama_lengkap}
              onChange={(e) => handlePelamarChange(e, pelamarData.id)}
            />
          </div>
          <div>
            <TextInput
              label="Alamat"
              id={`alamat ${pelamarData.id}`}
              name="alamat"
              placeHolder="Masukan Alamat"
              value={pelamarData.alamat}
              onChange={(e) => handlePelamarChange(e, pelamarData.id)}
            />
          </div>
          <div>
            <TextInput
              label="No Telepon"
              id={`noTelepon ${pelamarData.id}`}
              name="no_telepon"
              placeHolder="Masukan No Telepon"
              value={pelamarData.no_telepon}
              onChange={(e) => handlePelamarChange(e, pelamarData.id)}
            />
          </div>
        </div>
        <div>
          <TextInput
            label="No Induk"
            id={`noInduk ${pelamarData.id}`}
            name="no_induk"
            placeHolder="Masukan No Induk"
            value={pelamarData.no_induk}
            onChange={(e) => handlePelamarChange(e, pelamarData.id)}
          />
        </div>

        <div className="lg:justify-self-center">
          <TextInput
            label="Alamat Email"
            id={`alamatEmail ${pelamarData.id}`}
            type="email"
            name="email"
            placeHolder="Masukan Alamat Email"
            value={pelamarData.email}
            onChange={(e) => handlePelamarChange(e, pelamarData.id)}
          />
        </div>
        {pelamarData && (
          <div className="justify-self-end self-end">
            <Button
              bgColor="bg-error"
              textColor="text-white"
              paddingX="px-4"
              paddingY="py-2"
              onClick={(e) => handlePelamarDelete(e, pelamarData.id)}
            >
              Hapus Pelamar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformasiPelamar;
