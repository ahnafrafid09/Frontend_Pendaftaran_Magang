import React, { useState, useEffect, useContext } from "react";
import Button from "../../../../Components/Button";
import Title from "../../../../Components/Title";
import DataTable from "../../../../Components/DataTable";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../../../Components/Pagination";
import { GlobalContext } from "../../../../Context/GlobalContext";
import { GetContext } from "../../../../Context/GetContext";
import { Spinner } from "flowbite-react";

const Magang = () => {
  const { handleGet, stateGet } = useContext(GetContext);

  const { dataMagang } = stateGet;
  const { getDataMagang, changePage, handleChangeSearchTerm } = handleGet;
  const { datas, page, rows, pages, query, loading, keyword } = dataMagang;

  useEffect(() => {
    getDataMagang();
  }, [page, keyword]);

  const columnsMagang = [
    { Header: "No", accessor: (row, index) => index + 1 },
    { Header: "Instansi", accessor: "instansi.nama_instansi" },
    { Header: "Nomor ID", accessor: "id" },
    { Header: "Divisi Magang", accessor: "bagian" },
    { Header: "Mulai Magang", accessor: "tanggal_masuk" },
    { Header: "Selesai Magang", accessor: "tanggal_selesai" },
    {
      Header: "Status",
      accessor: "instansi.status",
      Cell: ({ value }) => (
        <div
          className={`capitalize ${
            value === "Diterima"
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
      accessor: "instansi.id",
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
  return (
    <>
      <Title>Data Magang</Title>
      <div className="bg-blue-50 mt-14 mb-8 border-t-4 border-primary-blue rounded p-6">
        <div className="flex justify-end">
          <div className="relative text-gray-600">
            <input
              className="bg-white h-10 px-6 pr-10 rounded-full text-sm focus:outline-none w-64"
              type="search"
              value={query}
              onChange={(e) => handleChangeSearchTerm(e, "dataMagang")}
              placeholder="Cari..."
            />
            <div className="absolute left-2 top-0 mt-3 mr-4">
              <AiOutlineSearch size="16px" />
            </div>
          </div>
        </div>
        <div className="mt-8">
          {loading ? (
            <div className="text-center">
              <Spinner aria-label="Center-aligned spinner" size="lg" />
              <h1>Loading ...</h1>
            </div>
          ) : (
            <>
              <DataTable
                data={datas}
                columns={columnsMagang}
                sortableColumns={sortTableColumns}
              />
              <div className="mt-4">
                <Pagination
                  rows={rows}
                  page={page}
                  pages={pages}
                  changePage={(selected) => changePage(selected, "dataMagang")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Magang;
