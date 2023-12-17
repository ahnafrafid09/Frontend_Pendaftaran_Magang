import React, { useState, useEffect, useContext } from "react";
import { GetContext } from "../../../Context/GetContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import InformasiInstansi from "../ComponentsDetail/InformasiInstansi";
import InformasiSurat from "../ComponentsDetail/InformasiSurat";
import InformasiPelamar from "../ComponentsDetail/InformasiPelamar";
import Title from "../../../Components/Title";
import Button from "../../../Components/Button";
import InformasiMagang from "../ComponentsDetail/InformasiMagang";

const DetailPengajuanMagang = () => {
  const { stateGet, handleGet } = useContext(GetContext);
  const { getDataById, resetFormData } = handleGet;
  const { instansiId } = useParams();
  const { pengajuan } = stateGet;
  console.log(pengajuan);
  const { instansi, surat, pelamar, loading } = pengajuan;
  console.log(surat);

  useEffect(() => {
    getDataById(instansiId);
  }, []);

  return (
    <>
      <Title>Detail Pengajuan Magang</Title>
      <div className="flex justify-start items-center mt-5">
        <Button
          textColor="text-white"
          navigate="/pengajuan"
          icon={<AiOutlineArrowLeft />}
          bgColor="bg-primary-blue"
          paddingY="py-2"
          paddingX="px-2.5"
          onClick={resetFormData}
          style="text-sm md:text-base lg:text-lg"
        >
          Kembali
        </Button>
      </div>
      <div className="flex flex-col justify-start gap-8 md:gap-4">
        <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
          {loading ? (
            <div className="text-center">
              <Spinner aria-label="Center-aligned spinner" size="lg" />
              <h1>Loading ...</h1>
            </div>
          ) : (
            <>
              <InformasiInstansi instansiData={instansi} />
              <InformasiSurat suratData={surat} />
              {pelamar.map((data, index) => (
                <InformasiPelamar data={data} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPengajuanMagang;
