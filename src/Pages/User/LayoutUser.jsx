import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { GlobalProvider } from "../../Context/GlobalContext";
import { GetProvider } from "../../Context/GetContext";
import Sidebar from "../../Components/Sidebar";
import { PostProvider } from "../../Context/PostContext";
import { UpdateProvider } from "../../Context/UpdateContext";
import { DeleteProvider } from "../../Context/DeleteContext";
import Pengajuan from "./Page/Pengajuan";
import Daftar from "./Page/Daftar";
import Magang from "./Page/Magang";
import DetailPengajuanMagang from "./Page/DetailPengajuanMagang";
import DetailDataMagang from "./Page/DetailDataMagang";
import History from "./Page/History";
import DetailHistoryMagang from "./Page/DetailHistoryMagang";
import Profile from "./Page/Profile";

const LayoutAdmin = () => {
  const [isSidebarClose, setSidebarClose] = useState(false);

  const toggleSidebar = () => {
    setSidebarClose(!isSidebarClose);
  };

  return (
    <>
      <GlobalProvider>
        <div className="flex w-full lg:flex-row">
          <Navbar onToggleSidebar={toggleSidebar} isClose={isSidebarClose} />
          <div className={`lg:w-[241px]${isSidebarClose ? "hidden" : "block"}`}>
            <Sidebar isClose={isSidebarClose} />
          </div>
          <main
            className={`w-full mt-24 p-4 lg:p-10 ${
              isSidebarClose
                ? "ml-0 lg:ml-8 "
                : "ml-0 lg:ml-[276px] lg:mt-[130px]"
            }`}
          >
            <GetProvider>
              <UpdateProvider>
                <DeleteProvider>
                  <PostProvider>
                    <Routes>
                      <Route axact path="/pengajuan" element={<Pengajuan />} />
                      <Route path="/daftar" element={<Daftar />} />
                      <Route path="/magang" element={<Magang />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/profil" element={<Profile />} />
                      <Route
                        path="/magang/detail/:instansiId"
                        element={<DetailDataMagang />}
                      />
                      <Route
                        path="/pengajuan/detail/:instansiId"
                        element={<DetailPengajuanMagang />}
                      />
                      <Route
                        path="/history/detail/:instansiId"
                        element={<DetailHistoryMagang />}
                      />
                    </Routes>
                  </PostProvider>
                </DeleteProvider>
              </UpdateProvider>
            </GetProvider>
          </main>
        </div>
      </GlobalProvider>
    </>
  );
};

export default LayoutAdmin;
