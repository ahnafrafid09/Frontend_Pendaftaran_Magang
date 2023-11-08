import React from "react";
import Logo from "../assets/Logo Diskominfo Jabar.png";
import { IoReorderThreeOutline } from "react-icons/io5";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div className="w-screen fixed top-0 left-0 z-10 h-24 bg-gradient-to-r from-[#E3F2FD] from-55.97% to-[#BBDEFB] shadow-md shadow[#475d7c]">
      <div className="flex justify-between items-center p-6">
        <button onClick={onToggleSidebar}>
          <IoReorderThreeOutline size="30px" />
        </button>
        <img className="w-40 h-auto" src={Logo} alt="" />
        <div className="mx-auto"></div>
        <div className="flex flex-between gap-4 items-center">
          <h1 className="text-lg font-roboto font-bold">Welcome, Admin</h1>
          <button className="bg-error px-3 py-2 text-white rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
