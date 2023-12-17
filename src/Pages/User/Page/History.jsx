import React, { useContext, useEffect } from "react";
import Title from "../../../Components/Title";
import { Spinner } from "flowbite-react";
import DataTable from "../../../Components/DataTable";
import { GetContext } from "../../../Context/GetContext";
import Button from "../../../Components/Button";
import { AiOutlineSearch } from "react-icons/ai";

const History = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { getDaftar } = handleGet;
  const { datas, loading } = stateGet;

  useEffect(() => {
    getDaftar();
  }, []);

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
            navigate={`/history/detail/${value}`}
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

  const sortTableColumns = ["Instansi"];

  const filteredData = datas.filter(
    (item) =>
      item.status.toLowerCase() === "selesai" ||
      item.status.toLowerCase() === "ditolak"
  );

  return (
    <div>
      <Title>History Magang</Title>
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
                  columns={columnsHistory}
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

export default History;
