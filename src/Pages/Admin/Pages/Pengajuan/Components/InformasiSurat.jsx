import React from "react";
import SubTitle from "../../../../../Components/SubTitle";
import Button from "../../../../../Components/Button";
import TextInput from "../../../../../Components/TextInput";
import DateInput from "../../../../../Components/DateInput";
import FileInput from "../../../../../Components/FileInput";

const InformasiSurat = ({
  handleUpdatedSurat,
  msgFile,
  suratData,
  setSuratData,
  handleFileChange,
}) => {
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="flex items-center gap-3">
        <SubTitle>Informasi Surat</SubTitle>
        <p className="text-error font-bold font-roboto">{msgFile}</p>
        {handleUpdatedSurat !== undefined ? (
          <Button
            bgColor="bg-primary-blue"
            textColor="text-white"
            paddingX="px-3"
            paddingY="py-0.5"
            onClick={handleUpdatedSurat}
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </div>
      {handleUpdatedSurat !== undefined ? (
        <div className="w-24 mt-3">
          <Button
            bgColor="bg-blue-900"
            paddingX="px-2"
            paddingY="py-1"
            textColor="text-white"
            navigate={suratData.url}
            target="_blank"
          >
            Buka File
          </Button>
        </div>
      ) : (
        ""
      )}

      <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
        {handleUpdatedSurat !== undefined ? (
          <FileInput
            label="Unggah Perubahan Surat (Opsional)"
            id="berkas"
            onChange={handleFileChange}
          />
        ) : (
          <FileInput
            label="Unggah Perubahan Surat"
            id="berkas"
            onChange={handleFileChange}
          />
        )}
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
  );
};

export default InformasiSurat;
