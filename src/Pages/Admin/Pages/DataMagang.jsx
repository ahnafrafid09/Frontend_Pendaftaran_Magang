import React, { useState, useEffect } from "react";
import Button from "../../../Components/Button";
import Title from "../../../Components/Title";
import DataTable from "../../../Components/DataTable";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../../Components/Pagination";
import axios from "axios";

const Magang = () => {
  const [magang, setMagang] = useState([]);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getMagang();
  }, [page, keyword]);

  const getMagang = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/daftar-terima?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setMagang(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

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
  return (
    <>
      <Title>Data Magang</Title>
      <div className="bg-blue-50 mt-5 mb-8 border-t-4 border-primary-blue rounded p-6">
        <div className="flex justify-end">
          <div className="relative text-gray-600">
            <button type="submit" className="absolute left-2 top-0 mt-3 mr-4">
              <AiOutlineSearch size="16px" />
            </button>
            <input
              className="bg-white h-10 px-6 pr-10 rounded-full text-sm focus:outline-none w-64"
              type="search"
              name="search"
              placeholder="Cari..."
            />
          </div>
        </div>
        <div className="mt-8">
          <DataTable data={magang} columns={columnsMagang} />
          <div className="mt-4">
            <Pagination
              rows={rows}
              page={page}
              pages={pages}
              changePage={changePage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Magang;
