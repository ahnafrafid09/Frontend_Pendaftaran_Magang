import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Pengajuan from "./Pages/Pengajuan";
import Laporan from "./Pages/Laporan";
import Status from "./Pages/Status";
import Akun from "./Pages/Akun";
import TambahPengajuan from "./Pages/TambahPengajuan";
import DetailPengajuan from "./Pages/DetailPengajuan";
import HistoryMagang from "./Pages/HistoryMagang";

const LayoutAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex w-full">
        <Navbar onToggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
        <main
          className={`w-full mt-24 p-10 ${sidebarOpen ? "ml-[241px]" : "ml-8"}`}
        >
          <Routes>
            <Route exact path="/" Component={Dashboard} />
            <Route path="/pengajuan" Component={Pengajuan} />
            <Route path="/status" Component={Status} />
            <Route path="/akun" Component={Akun} />
            <Route path="/laporan" Component={Laporan} />
            <Route path="/history" Component={HistoryMagang} />
            <Route path="/pengajuan/tambah" Component={TambahPengajuan} />
            <Route
              path="/pengajuan/detail/:instansiId"
              Component={DetailPengajuan}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default LayoutAdmin;
