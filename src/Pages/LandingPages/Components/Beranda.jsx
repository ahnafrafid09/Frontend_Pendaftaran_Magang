import React from "react";
import { Element } from "react-scroll";
import Button from "../../../Components/Button";
import image from "../../../assets/home-image.png";
import Cookies from "js-cookie";

const Beranda = () => {
  const currentYear = new Date().getFullYear();

  const isLoginFromCookie = Cookies.get("isLogin") === "true";
  const roleFromCookie = Cookies.get("role");

  return (
    <Element name="beranda">
      <div className="w-full h-screen bg-gradient-to-br from-blue-800 to-blue-300">
        <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="md:w-1/2">
            <h1 className="text-white text-3xl text-center md:text-left mt-5 md:mt-0 md:text-5xl font-semibold font-roboto leading-relaxed">
              Pendaftaran Magang {currentYear}
              <br />
              DISKOMINFO
            </h1>
            <p className="text-white text-lg text-center md:text-left md:text-xl font-lato mt-5 md:mt-10 leading-relaxed md:w-3/4">
              <span className="font-bold">Jangan Lewatkan </span>kesempatan
              untuk magang di Diskominfo Jabar dan menjadi bagian dari inovasi
              teknologi informasi yang mendukung kemajuan Jawa Barat.
            </p>
            <div className="w-full md:w-1/2 mt-5 md:mt-10">
              <Button
                bgColor="bg-white"
                style="px-3 py-3 md:px-4 md:py-4 font-lato font-bold text-xl leading-relaxed w-full md:w-auto text-blue-800"
                navigate={
                  isLoginFromCookie && roleFromCookie
                    ? roleFromCookie === "admin"
                      ? "/admin/pengajuan/daftar"
                      : "/daftar"
                    : "/register"
                }
              >
                Daftar Sekarang
              </Button>
            </div>
          </div>
          <div className="mt-5 md:mt-0">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </Element>
    // <Element name="beranda">
    //   <div className="w-full h-screen bg-gradient-to-br from-blue-800 to-blue-300">
    //     <div className="container mx-auto h-full flex items-center justify-between">
    //       <div className="flex flex-col">
    //         <h1 className="text-white text-5xl font-semibold font-roboto leading-relaxed">
    //           Pendaftaran Magang 2023
    //           <br />
    //           DISKOMINFO
    //         </h1>
    //         <p className="text-white text-xl font-lato mt-10 leading-relaxed w-1/2">
    //           <span className="font-bold">Jangan Lewatkan </span>kesempatan
    //           untuk magang di Diskominfo Jabar dan menjadi bagian dari inovasi
    //           teknologi informasi yang mendukung kemajuan Jawa Barat.
    //         </p>
    //         <div className="w-1/4">
    //           <Button
    //             bgColor="bg-white"
    //             style="px-4 py-4 font-lato font-bold text-xl leading-relaxed mt-14 text-blue-800"
    //           >
    //             Daftar Sekarang
    //           </Button>
    //         </div>
    //       </div>
    //       <img src={image} alt="" />
    //     </div>
    //   </div>
    // </Element>
  );
};

export default Beranda;
