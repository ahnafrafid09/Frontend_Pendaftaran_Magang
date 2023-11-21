import React, { useState, useEffect } from "react";
import { getDaftarSelesai } from "../../../../libs/api";
import Button from "../../../../Components/Button";
import Pagination from "../../../../Components/Pagination";
import DataTable from "../../../../Components/DataTable";
import Title from "../../../../Components/Title";
import { AiOutlineSearch } from "react-icons/ai";

const HistoryMagang = () => {
  const [history, setHistory] = useState([]);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getDaftar();
  }, [page, keyword]);

  const getDaftar = async () => {
    const data = await getDaftarSelesai(keyword, page, limit);
    setHistory(data.result);
    setPage(data.page);
    setPages(data.totalPage);
    setRows(data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const handleChangeSearchTerm = (e) => {
    const term = e.target.value;
    setQuery(term);
    setKeyword(term);
  };

  const columnsHistory = [
    { Header: "No", accessor: (row, index) => index + 1 },
    { Header: "Instansi", accessor: "nama_instansi" },
    { Header: "Tanggal Pengajuan", accessor: "surat.tanggal_pengajuan" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <div
          className={`capitalize ${
            value === "Ditolak"
              ? "text-error font-bold"
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
            navigate={`/admin/history/detail/${value}`}
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
      <Title>History Magang</Title>
      <div className="bg-blue-50 mt-14 mb-8 border-t-4 border-primary-blue rounded p-6">
        <div className="flex justify-end">
          <div className="relative text-gray-600">
            <button type="submit" className="absolute left-2 top-0 mt-3 mr-4">
              <AiOutlineSearch size="16px" />
            </button>
            <input
              className="bg-white h-10 px-6 pr-10 rounded-full text-sm focus:outline-none w-64"
              type="search"
              name="search"
              onChange={handleChangeSearchTerm}
              placeholder="Cari..."
            />
          </div>
        </div>
        <div className="mt-8">
          <DataTable data={history} columns={columnsHistory} />
          <div className="mt-4">
            <Pagination
              rows={rows}
              pages={pages}
              page={page}
              changePage={changePage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryMagang;
