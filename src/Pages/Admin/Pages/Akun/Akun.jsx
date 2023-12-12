import React, { useContext, useEffect, useState } from "react";
import Title from "../../../../Components/Title";
import Button from "../../../../Components/Button";
import { GetContext } from "../../../../Context/GetContext";
import DataTable from "../../../../Components/DataTable";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import Pagination from "../../../../Components/Pagination";
import TambahAkun from "./TambahAkun";
import EditAkun from "./EditAkun";

const Akun = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { getDataUser, handleChangeSearchTerm, changePage } = handleGet;
  const { dataUser } = stateGet;
  const { datas, query, page, pages, rows, loading, keyword } = dataUser;
  console.log("data user", dataUser);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openModalTambah, setOpenModalTambah] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const handleEditClick = (userId) => {
    setOpenModalEdit(true);
    setSelectedUserId(userId);
  };

  useEffect(() => {
    getDataUser();
  }, [page, keyword]);

  const columnsUser = [
    { Header: "No", accessor: (row, index) => index + 1 },
    { Header: "Nama", accessor: "name" },
    { Header: "Username", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    {
      Header: "Tindakan",
      accessor: "id",
      Cell: ({ value }) => (
        <div className="flex items-center justify-center space-x-4">
          <Button
            bgColor="bg-primary-blue"
            style="w-20"
            paddingY="py-2"
            paddingX="px-4"
            textColor="text-netral-white"
            onClick={() => handleEditClick(value)}
          >
            Edit
          </Button>
          <Button
            bgColor="bg-error"
            paddingY="py-2"
            paddingX="px-4"
            style="w-20"
            textColor="text-netral-white"
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];
  const sortTableColumns = ["Nama", "Role"];
  return (
    <>
      <Title>Manajemen Akun</Title>
      <div className="mt-6">
        <div className="w-full flex justify-end pr-6">
          <Link>
            <button
              className="flex items-center gap-2 bg-primary-blue text-white py-2.5 px-4 rounded-lg "
              onClick={() => setOpenModalTambah(true)}
            >
              <AiOutlinePlus />
              <h1 className="hidden md:block">Tambah Akun</h1>
            </button>
          </Link>
          {openModalTambah && (
            <TambahAkun close={() => setOpenModalTambah(false)} />
          )}
          {openModalEdit && (
            <EditAkun
              close={() => setOpenModalEdit(false)}
              idUser={selectedUserId}
            />
          )}
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
                onChange={(e) => handleChangeSearchTerm(e, "dataUser")}
                placeholder="Cari..."
              />
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
                  columns={columnsUser}
                  sortableColumns={sortTableColumns}
                />
                <div className="mt-4">
                  <Pagination
                    rows={rows}
                    page={page}
                    pages={pages}
                    changePage={(selected) =>
                      changePage({ selected }, "dataUser")
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Akun;
