import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDaftarMenunggu } from "../../../../libs/api";
import Button from "../../../../Components/Button";
import Pagination from "../../../../Components/Pagination";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import DataTable from "../../../../Components/DataTable";
import Title from "../../../../Components/Title";

const Pengajuan = () => {
  const [daftar, setDaftar] = useState([]);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getDaftar();
  }, [page, keyword]);

  const getDaftar = async () => {
    const response = await getDaftarMenunggu(keyword, page, limit);
    setDaftar(response.result);
    setPage(response.page);
    setPages(response.totalPage);
    setRows(response.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };
  const handleSearch = (e) => {
    const term = e.target.value;
    setPage(0);
    setKeyword(term);
    setQuery(term);
  };

  const columnsPengajuan = [
    { id: "no", Header: "No", accessor: (_, index) => index + 1 },
    { id: "namaInstansi", Header: "Instansi", accessor: "nama_instansi" },
    {
      id: "noId",
      Header: "Nomor ID",
      accessor: "id",
      Cell: ({ value }) => `M-${value}`,
    },
    {
      id: "tglPengajuan",
      Header: "Tanggal Pengajuan",
      accessor: "surat.tanggal_pengajuan",
    },
    {
      id: "status",
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <div
          className={`capitalize ${
            value === "Menunggu" ? "text-yellow-800 font-bold" : "text-black"
          }`}
        >
          {value}
        </div>
      ),
    },
    {
      id: "tindakan",
      Header: "Tindakan",
      accessor: "id",
      Cell: ({ value }) => (
        <div className="w-full flex justify-center items-center">
          <Button
            navigate={`/admin/pengajuan/detail/${value}`}
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
    <div>
      <Title>Pengajuan Magang</Title>
      <div className="mt-6">
        <div className="w-full flex justify-end pr-6">
          <Link
            to="/admin/pengajuan/tambah"
            className="flex items-center gap-2 bg-primary-blue text-white py-2.5 px-4 rounded-lg"
          >
            <AiOutlinePlus />
            <h1 className="hidden md:block">Tambah Pengajuan</h1>
          </Link>
        </div>
        <div className="bg-blue-50 mt-5 mb-8 border-t-4 border-primary-blue rounded p-6">
          <div className="flex justify-end">
            <div className="relative text-gray-600">
              <button type="submit" className="absolute left-2 top-0 mt-3 mr-4">
                <AiOutlineSearch size="16px" />
              </button>
              <input
                className="bg-white h-10 px-6 pr-10 rounded-full text-sm focus:outline-none w-full sm:w-64"
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Cari..."
              />
            </div>
          </div>
          <div className="mt-8">
            <DataTable data={daftar} columns={columnsPengajuan} />
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
      </div>
    </div>
  );
};

export default Pengajuan;
