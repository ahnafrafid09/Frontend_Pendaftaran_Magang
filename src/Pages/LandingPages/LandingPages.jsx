import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo diskominfo jabar.png';

const LandingPages = () => {
  return (
    <nav className="absolute w-full md:w-11/12 lg:w-10/12 xl:w-9/12 h-12 md:h-16 lg:h-20 xl:h-24 top-0 left-0 bg-blue-300 shadow-md flex items-center px-4 md:px-6 lg:px-8 xl:px-10 space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10">
  <img src={logo} alt="Logo" className="w-1/6 md:w-1/8 lg:w-1/10 xl:w-1/12 h-full" />
  <ul className="flex space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10">
    <li className="font-lato font-bold text-lg leading-23 text-blue-900 flex items-center flex-none order-0 flex-grow-0 border-b-2 border-blue-900">
      <Link to="/">Beranda</Link>
    </li>
    <li className="font-lato font-medium text-lg leading-23 text-blue-900 flex items-center flex-none order-0 flex-grow-0">
      <Link to="/about">Tentang Kami</Link>
    </li>
    <li className="font-lato font-medium text-lg leading-23 text-blue-900 flex items-center flex-none order-0 flex-grow-0">
      <Link to="/faq">FAQ</Link>
    </li>
    <li className="font-lato font-medium text-lg leading-23 text-blue-900 flex items-center flex-none order-0 flex-grow-0">
      <Link to="/contact">Kontak</Link>
    </li>
  </ul>
  <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10">
    <Link to="/register" className="font-lato font-medium text-lg leading-23 text-blue-900 flex items-center flex-none order-0 flex-grow-0">
      DAFTAR
    </Link>
    <Link to="/login" className="font-lato font-bold text-lg leading-23 text-white px-30 py-10 bg-blue-900 rounded-md flex-none order-1 flex-grow-0">
      MASUK
    </Link>
  </div>
</nav>
  );
};

export default LandingPages;