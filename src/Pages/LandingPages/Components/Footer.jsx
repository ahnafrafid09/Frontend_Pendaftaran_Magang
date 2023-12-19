import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-gradient-to-br from-blue-800 to-blue-300 w-full h-32 ">
      <div className=" p-4 flex items-center justify-center w-full h-full">
        <span className="text-sm text-white sm:text-center ">
          © {currentYear} Diskomnifo . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
