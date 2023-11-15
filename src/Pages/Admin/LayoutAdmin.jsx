import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Pengajuan from "./Pages/Pengajuan";
import Magang from "./Pages/DataMagang";
import Akun from "./Pages/Akun";
import TambahPengajuan from "./Pages/TambahPengajuan";
import DetailPengajuan from "./Pages/DetailPengajuan";
import DetailMagang from "./Pages/DetailMagang";
import HistoryMagang from "./Pages/HistoryMagang";
import DetailHistory from "./Pages/DetailHistory";

const LayoutAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex w-full lg:flex-row">
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className={`lg:w-[241px]${isSidebarOpen ? "block" : "hidden"}`}>
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <main
          className={`w-full mt-24 p-4 lg:p-10 ${
            isSidebarOpen ? "ml-0 lg:ml-[241px]" : "ml-0 lg:ml-8"
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
