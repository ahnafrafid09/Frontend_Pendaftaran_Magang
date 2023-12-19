import React, { useState } from "react";
import Logo from "../../../assets/Logo Diskominfo Jabar.png";
import { Link } from "react-scroll";
import { TfiAlignJustify, TfiClose } from "react-icons/tfi";
import { Link as Linked } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-100 p-4 text-blue-900 font-semibold font-roboto sticky top-0 left-0">
      <div className=" w-full px-4 md:container md:mx-auto md:px-0 flex justify-between items-center">
        <img className="w-36" src={Logo} alt="Logo Diskominfo Jawa Barat" />
        <div
          className={
            isOpen
              ? "md:hidden absolute top-16 left-0 right-0 py-5 px-4 bg-blue-100 text-cream-text"
              : "hidden md:block"
          }
        >
          <ul
            className={
              isOpen ? "flex flex-col items-start gap-5 px-5" : "flex gap-9"
            }
          >
            <li>
              <Link
                to="beranda"
                delay={300}
                spy={true}
                offset={-100}
                smooth={true}
                className="cursor-pointer"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="tentang"
                smooth={true}
                delay={300}
                spy={true}
                offset={-70}
                className="cursor-pointer"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                to="faq"
                smooth={true}
                delay={300}
                spy={true}
                offset={-70}
                className="cursor-pointer"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="kontak"
                smooth={true}
                delay={300}
                spy={true}
                offset={-70}
                className="cursor-pointer"
              >
                Kontak
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 md:gap-7 items-center">
          <Linked to="/register">
            <button>Daftar</button>
          </Linked>
          <Linked to="/login">
            <button className="bg-blue-900 text-white px-3 py-1 rounded-lg">
              Login
            </button>
          </Linked>
          <div className="md:hidden cursor-pointer" onClick={openNavigation}>
            {isOpen ? <TfiClose /> : <TfiAlignJustify />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
