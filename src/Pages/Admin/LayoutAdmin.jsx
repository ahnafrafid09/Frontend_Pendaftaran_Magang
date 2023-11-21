import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Routes, Route } from "react-router-dom";
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

const LayoutAdmin = () => {
  const [isSidebarClose, setSidebarClose] = useState(false);

  const toggleSidebar = () => {
    setSidebarClose(!isSidebarClose);
  };

  return (
    <>
      <div className="flex w-full lg:flex-row">
        <Navbar onToggleSidebar={toggleSidebar} />
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pengajuan" element={<Pengajuan />} />
            <Route path="/magang" element={<Magang />} />
            <Route path="/akun" element={<Akun />} />
            <Route path="/history" element={<HistoryMagang />} />
            <Route path="/pengajuan/tambah" element={<TambahPengajuan />} />
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
          </Routes>
        </main>
      </div>
    </>
  );
};

export default LayoutAdmin;
