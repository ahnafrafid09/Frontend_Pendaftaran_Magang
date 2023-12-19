import React from "react";
import Navbar from "./Components/Navbar";
import Beranda from "./Components/Beranda";
import TentangKami from "./Components/TentangKami";
import Faq from "./Components/Faq";
import Kontak from "./Components/Kontak";
import Footer from "./Components/Footer";
const LandingPages = () => {
  return (
    <>
      <Navbar />
      <Beranda />
      <TentangKami />
      <Faq />
      <Kontak />
      <Footer />
    </>
  );
};

export default LandingPages;
