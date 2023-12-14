import React, { useContext } from "react";
import { HiViewGrid, HiOutlineClock } from "react-icons/hi";
import { RiMailDownloadLine } from "react-icons/ri";
import { TbSettings2 } from "react-icons/tb";
import { NavLink, Navigate } from "react-router-dom";
import { AiOutlineHistory } from "react-icons/ai";
import { GlobalContext } from "../Context/GlobalContext";

const Sidebar = ({ isClose }) => {
  const { globalContext } = useContext(GlobalContext);
  const { role } = globalContext;
  let sideList;
  if (role === "admin") {
    sideList = [
      {
        listName: "Dashboard",
        icon: HiViewGrid,
        link: "/admin",
      },
      {
        listName: "Pengajuan Magang",
        icon: RiMailDownloadLine,
        link: "/admin/pengajuan",
      },
      {
        listName: "Data Magang",
        icon: HiOutlineClock,
        link: "/admin/magang",
      },
      {
        listName: "History Magang",
        icon: AiOutlineHistory,
        link: "/admin/history",
      },
      {
        listName: "Manajemen Akun",
        icon: TbSettings2,
        link: "/admin/akun",
      },
    ];
  } else if (role === "user") {
    sideList = [
      {
        listName: "Pengajuan Magang",
        icon: RiMailDownloadLine,
        link: "/pengajuan",
      },
      {
        listName: "Data Magang",
        icon: HiOutlineClock,
        link: "/magang",
      },
      {
        listName: "Manajemen Akun",
        icon: TbSettings2,
        link: "/profil",
      },
    ];
  }
  sideList = sideList || [];
  return (
    <div
      className={`w-60 z-10 bg-gradient-to-b from-[#E3F2FD] from-55.97% to-[#BBDEFB] h-screen fixed overflow-y-auto top-24 left-0 transition-transform transform ${
        isClose ? " translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-2 pt-6 gap-4">
        {sideList.map((list, index) => {
          const Icon = list.icon;
          return (
            <NavLink
              key={index}
              to={list.link}
              activeclassname="active"
              className="relative px-3 py-4 flex items-center space-x-4 justify-start text-black text-lg rounded-lg group hover:text-blue-900 hover:font-semibold"
            >
              <Icon />
              <h1 className=" font-roboto">{list.listName}</h1>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
