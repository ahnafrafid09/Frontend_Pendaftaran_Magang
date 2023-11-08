import React, { useState, useEffect } from "react";
import Button from "../../../Components/Button";
import Title from "../../../Components/Title";
import { AiOutlineSearch } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Status = () => {
  const [daftar, setDaftar] = useState([]);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getDaftar();
  }, [page, keyword]);

  const getDaftar = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/daftar-terima?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setDaftar(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };
  console.log(daftar);

  const changePage = ({ selected }) => {
    setPage(selected);
  };
  return (
    <div>
      <div>
        <Title>Status Magang</Title>
      </div>
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
          <table className="table-auto w-full border border-black font-lato">
            <thead className="border border-black bg-transparent">
              <tr>
                <th className="border border-black py-4">No</th>
                <th className="border border-black">Instansi</th>
                <th className="border border-black">Nomor ID</th>
                <th className="border border-black">Divisi Magang</th>
                <th className="border border-black">Mulai Magang</th>
                <th className="border border-black">Selesai Magang</th>
                <th className="border border-black">Status</th>
                <th className="border border-black">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {daftar.map((data, index) => {
                return (
                  <tr className="text-center bg-white" key={index}>
                    <td className="border border-black p-4">{index + 1}</td>
                    <td className="border border-black capitalize">
                      {data.instansi.nama_instansi}
                    </td>
                    <td className="border border-black">{data.id}</td>
                    <td className="border border-black capitalize">
                      {data.bagian !== null && data ? data.bagian : "-"}
                    </td>
                    <td className="border border-black capitalize">
                      {data.tanggal_masuk !== null && data
                        ? data.tanggal_masuk
                        : "-"}
                    </td>
                    <td className="border border-black capitalize">
                      {data.tanggal_selesai !== null && data
                        ? data.tanggal_selesai
                        : "-"}
                    </td>
                    <td className="border border-black capitalize text-yellow-800">
                      {data.instansi.status}
                    </td>
                    <td className="border border-black">
                      <Link className="flex justify-center items-center gap-2">
                        <BiEdit className="text-error" />
                        <h1 className="text-yellow-900">Edit</h1>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <p>
              Showing {rows} to {rows ? page + 1 : 0} of {pages} entries
            </p>
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={pages}
              onPageChange={changePage}
              containerClassName="flex items-center justify-center mt-8 mb-4"
              pageClassName="block text-netral-black font-lato border border-gray-500 rounded w-10 h-10 flex items-center justify-center"
              previousClassName="w-20 h-10 flex items-center justify-center text-netral-gray bg-white font-lato"
              nextClassName="w-20 h-10 flex items-center justify-center text-netral-black bg-white font-lato"
              activeClassName="bg-blue-400 text-white border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
