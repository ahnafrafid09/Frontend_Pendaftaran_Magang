import React from "react";
import { Element } from "react-scroll";
import Card from "./Card";
import Icon1 from "../../../assets/icon1.png";
import Icon2 from "../../../assets/icon2.png";
import Icon3 from "../../../assets/icon3.png";

const TentangKami = () => {
  return (
    <Element name="tentang">
      <div className="w-full h-auto md:h-screen bg-blue-50">
        <div className="w-full md:container md:mx-auto flex items-center justify-center flex-col py-8 md:py-16 px-4">
          <h1 className="text-center text-blue-800 text-4xl md:text-5xl font-semibold font-roboto leading-relaxed mb-4 md:mb-8">
            Tentang Kami
          </h1>
          <p className="text-center text-black text-base md:text-lg font-normal font-lato mb-4 md:mb-6">
            Program magang Diskominfo Jawa Barat untuk kemajuan Jawa Barat
          </p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between mt-4 md:mt-8 gap-4 md:gap-8">
            <Card
              icon={Icon1}
              judul="Divisi Magang"
              text="Jelajahi beragam kesempatan pengembangan diri dan peningkatan keterampilan di Divisi Magang kami."
            />
            <Card
              icon={Icon2}
              judul="Galeri Magang"
              text="Saksikan karya-karya luar biasa mahasiswa magang kami di Galeri Magang."
            />
            <Card
              icon={Icon3}
              judul="Pengalaman Alumni"
              text="Dengarkan kisah sukses dan tantangan yang dihadapi oleh rekan magang sebelumnya."
            />
          </div>
        </div>
      </div>
    </Element>
    // <Element name="tentang">
    //   <div className="w-full h-screen bg-blue-50">
    //     <div className="md:container md:mx-auto w-full flex items-center justify-center flex-col h-screen">
    //       <h1 className="text-center text-blue-800 text-5xl font-semibold font-roboto leading-relaxed">
    //         Tentang Kami
    //       </h1>
    //       <p className="text-center text-black text-lg font-normal font-lato">
    //         Program magang Diskominfo Jawa Barat untuk kemajuan Jawa Barat
    //       </p>
    //       <div className=" w-full flex flex-col md:flex-row items-center justify-between mt-10 gap-y-4">
    //         <Card
    //           icon={Icon1}
    //           judul="Divisi Magang"
    //           text="Jelajahi beragam kesempatan pengembangan diri dan peningkatan keterampilan di Divisi Magang kami."
    //         />
    //         <Card
    //           icon={Icon2}
    //           judul="Galeri Magang"
    //           text="Saksikan karya-karya luar biasa mahasiswa magang kami di Galeri Magang."
    //         />
    //         <Card
    //           icon={Icon3}
    //           judul="Pengalaman Alumni"
    //           text="Dengarkan kisah sukses dan tantangan yang dihadapi oleh rekan magang sebelumnya."
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </Element>
  );
};

export default TentangKami;
