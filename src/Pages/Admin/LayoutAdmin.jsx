import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalProvider } from "../../Context/GlobalContext";
import { GetProvider } from "../../Context/GetContext";
import Sidebar from "../../Components/Sidebar";
import Pengajuan from "./Pages/Pengajuan/Pengajuan";
import Magang from "./Pages/Magang/DataMagang";
import TambahPengajuan from "./Pages/Pengajuan/TambahPengajuan";
import DetailPengajuan from "./Pages/Pengajuan/DetailPengajuan";
import DetailMagang from "./Pages/Magang/DetailMagang";
import HistoryMagang from "./Pages/History/HistoryMagang";
import DetailHistory from "./Pages/History/DetailHistory";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Akun from "./Pages/Akun/Akun";
import { PostProvider } from "../../Context/PostContext";
import { UpdateProvider } from "../../Context/UpdateContext";
import { DeleteProvider } from "../../Context/DeleteContext";
import { useAuth } from "../../Context/AuthContext";

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
                      <Route path="/pengajuan" element={<Pengajuan />} />
                      <Route path="/magang" element={<Magang />} />
                      <Route path="/akun" element={<Akun />} />
                      <Route path="/history" element={<HistoryMagang />} />
                      <Route
                        path="/pengajuan/daftar"
                        element={<TambahPengajuan />}
                      />
                      <Route
                        path="/pengajuan/detail/:instansiId"
                        element={<DetailPengajuan />}
                      />
                      <Route
                        path="/magang/detail/:instansiId"
                        element={<DetailMagang />}
                      />
                      <Route
                        path="/history/detail/:instansiId"
                        element={<DetailHistory />}
                      />
                      <Route path="/" element={<Dashboard />} />
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
