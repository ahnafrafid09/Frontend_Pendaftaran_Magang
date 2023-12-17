import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiFilePdf } from "react-icons/pi";
import TextInput from "../../../Components/TextInput";
import SubTitle from "../../../Components/SubTitle";

const InformasiSurat = ({ suratData }) => {
  console.log(suratData);
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="flex items-center gap-3">
        <SubTitle>Informasi Surat</SubTitle>
      </div>
      <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
        <Link to={suratData.url} target="_blank">
          <div className="flex flex-col gap-y-2.5 border">
            <label className="font-lato font-bold">Surat Pengantar</label>
            <div className="flex gap-2 w-64 font-semibold items-center justify-center h-10 border border-netral-black rounded-md px-4">
              <PiFilePdf size="24px" />
              <p
                className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"
                title={suratData.file}
              >
                {suratData.file}
              </p>
            </div>
          </div>
        </Link>
        <TextInput
          label="No Surat"
          disabled={true}
          id="noSurat"
          value={suratData.noSurat}
        />
        <TextInput
          id="tanggalPengajuan"
          label="Tanggal Pengajuan"
          disabled={true}
          value={suratData.tglPengajuan}
        />
      </div>
    </div>
  );
};

export default InformasiSurat;
