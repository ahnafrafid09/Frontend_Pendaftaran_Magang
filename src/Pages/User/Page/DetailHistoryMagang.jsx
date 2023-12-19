import React, { useContext, useEffect } from "react";
import Title from "../../../Components/Title";
import Button from "../../../Components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Spinner } from "flowbite-react";
import SubTitle from "../../../Components/SubTitle";
import TextInput from "../../../Components/TextInput";
import InformasiInstansi from "../ComponentsDetail/InformasiInstansi";
import InformasiMagang from "../ComponentsDetail/InformasiMagang";
import InformasiPelamar from "../ComponentsDetail/InformasiPelamar";
import InformasiSurat from "../ComponentsDetail/InformasiSurat";
import Catatan from "../ComponentsDetail/Catatan";
import { GetContext } from "../../../Context/GetContext";
import { useParams } from "react-router-dom";
const DetailHistoryMagang = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { getDataSelesaiById, resetFormData } = handleGet;
  const { history, alasan } = stateGet;
  const { instansi, magang, surat, pelamar, loading } = history;

  const { instansiId } = useParams();

  useEffect(() => {
    getDataSelesaiById(instansiId);
  }, []);
  return (
    <>
      <Title>Detail History Magang</Title>
      <div className="flex justify-start items-center mt-5">
        <Button
          textColor="text-white"
          navigate="/history"
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
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" size="lg" />
          <h1>Loading ...</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-8 md:gap-4">
          <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
            <div className="flex gap-2 items-center">
              <SubTitle>Informasi Magang</SubTitle>
            </div>
            <div className="flex flex-wrap flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mt-4">
              <TextInput
                id="status"
                label="Status"
                disabled={true}
                value={instansi.status}
              />

              {magang && instansi.status === "Selesai" ? (
                <InformasiMagang magangData={magang} />
              ) : (
                ""
              )}
            </div>
          </div>
          <InformasiInstansi instansiData={instansi} />
          <InformasiSurat suratData={surat} />
          {pelamar.map((data, index) => (
            <InformasiPelamar data={data} key={index} />
          ))}
          {alasan.alasan_tolak !== null && instansi.status === "Ditolak" ? (
            <Catatan alasan={alasan} />
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default DetailHistoryMagang;
