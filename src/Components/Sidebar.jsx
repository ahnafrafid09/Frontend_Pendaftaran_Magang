import React from "react";
import { HiViewGrid, HiOutlineClock } from "react-icons/hi";
import { RiMailDownloadLine } from "react-icons/ri";
import { TbSettings2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { AiOutlineHistory } from "react-icons/ai";

const sideList = [
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

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`w-60 z-10 bg-gradient-to-b from-[#E3F2FD] from-55.97% to-[#BBDEFB] h-screen fixed overflow-y-auto top-24 left-0 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-2 pt-6 gap-4">
        {sideList.map((list, index) => {
          const Icon = list.icon;
          return (
            <NavLink
              key={index}
              to={list.link}
              activeclassname="text-blue-900 font-semibold"
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
