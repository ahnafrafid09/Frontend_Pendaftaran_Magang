import React, { useEffect, useContext } from "react";
import Title from "../../../Components/Title";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { GetContext } from "../../../Context/GetContext";
import { Spinner } from "flowbite-react";
import DataTable from "../../../Components/DataTable";
import Button from "../../../Components/Button";

const Magang = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { getDaftar } = handleGet;
  const { datas, loading } = stateGet;

  useEffect(() => {
    getDaftar();
  }, []);

  const columnsMagang = [
    { Header: "No", accessor: (row, index) => index + 1 },
    { Header: "Instansi", accessor: "nama_instansi" },
    { Header: "Nomor ID", accessor: "magang.id" },
    { Header: "Divisi Magang", accessor: "magang.bagian" },
    { Header: "Mulai Magang", accessor: "magang.tanggal_masuk" },
    { Header: "Selesai Magang", accessor: "magang.tanggal_selesai" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <div
          className={`capitalize ${
            value === "Diterima" && value === "Aktif"
              ? "text-green-800 font-bold"
              : "text-blue-900 font-bold"
          }`}
        >
          {value}
        </div>
      ),
    },
    {
      Header: "Tindakan",
      accessor: "id",
      Cell: ({ value }) => (
        <div className="w-full flex justify-center items-center">
          <Button
            navigate={`/admin/magang/detail/${value}`}
            icon={<AiOutlineSearch size="24px" />}
            bgColor="bg-primary-blue"
            paddingY="py-2"
            paddingX="px-4"
            textColor="text-netral-white"
          >
            Detail
          </Button>
        </div>
      ),
    },
  ];
  const sortTableColumns = [
    "Instansi",
    "Mulai Magang",
    "Selesai Magang",
    "Nomor Id",
  ];

  const filteredData = datas.filter(
    (item) =>
      item.status.toLowerCase() === "aktif" ||
      item.status.toLowerCase() === "selesai" ||
      item.status.toLowerCase() === "diterima"
  );

  return (
    <div>
      <Title>Data Magang</Title>
      <div className="mt-6">
        <div className="bg-blue-50 mt-5 mb-8 border-t-4 border-primary-blue rounded p-6">
          <div className="mt-8">
            {loading ? (
              <div className="text-center">
                <Spinner aria-label="Center-aligned spinner" size="lg" />
                <h1>Loading ...</h1>
              </div>
            ) : (
              <>
                <DataTable
                  data={filteredData}
                  columns={columnsMagang}
                  sortableColumns={sortTableColumns}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Magang;
