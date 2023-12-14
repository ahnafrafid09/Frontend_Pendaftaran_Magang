import React, { useEffect, useContext } from "react";
import Title from "../../../Components/Title";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { GetContext } from "../../../Context/GetContext";
import { Spinner } from "flowbite-react";
import DataTable from "../../../Components/DataTable";
import Button from "../../../Components/Button";

const Pengajuan = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { getDaftar } = handleGet;
  const { datas, loading } = stateGet;

  useEffect(() => {
    getDaftar();
  }, []);

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
            value === "Menunggu"
              ? "text-yellow-800 font-bold"
              : "text-error font-bold"
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
  const sortTableColumns = ["Instansi", "Nomor ID", "Tanggal Pengajuan"];

  const filteredData = datas.filter(
    (item) =>
      item.status.toLowerCase() === "menunggu" ||
      item.status.toLowerCase() === "ditolak"
  );

  return (
    <div>
      <Title>Pengajuan Magang</Title>
      <div className="mt-6">
        <div className="w-full flex justify-end pr-6">
          <Link to="/daftar">
            <button className="flex items-center gap-2 bg-primary-blue text-white py-2.5 px-4 rounded-lg">
              <AiOutlinePlus />
              <h1 className="hidden md:block">Tambah Pengajuan</h1>
            </button>
          </Link>
        </div>
        <div className="bg-blue-50 mt-5 mb-8 border-t-4 border-primary-blue rounded p-6">
          {/* <div className="flex justify-end">
            <div className="relative text-gray-600">
              <button type="submit" className="absolute left-2 top-0 mt-3 mr-4">
                <AiOutlineSearch size="16px" />
              </button>
              <input
                className="bg-white h-10 px-6 pr-10 rounded-full text-sm focus:outline-none w-full sm:w-64"
                type="search"
                value={query}
                onChange={(e) => handleChangeSearchTerm(e, "dataPengajuan")}
                placeholder="Cari..."
              />
            </div>
          </div> */}
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
                  columns={columnsPengajuan}
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

export default Pengajuan;
