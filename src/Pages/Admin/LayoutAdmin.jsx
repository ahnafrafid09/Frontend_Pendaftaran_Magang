import React from "react";
import Navbar from "../../Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Pengajuan from "./Pages/Pengajuan";
import Laporan from "./Pages/Laporan";
import Status from "./Pages/Status";
import Akun from "./Pages/Akun";


const LayoutAdmin = () => {
  return (
    <>
      <div className="flex w-full">
        <Navbar />
          <Sidebar />
          <main className="w-full ml-[241px] mt-24 p-10">
            <Routes>
              <Route exact path="/" Component={Dashboard} />
              <Route path="/pengajuan" Component={Pengajuan} />
              <Route path="/status" Component={Status} />
              <Route path="/akun" Component={Akun} />
              <Route path="/laporan" Component={Laporan} />
            </Routes>
          </main>

      </div>
    </>
  );
};

export default LayoutAdmin;
