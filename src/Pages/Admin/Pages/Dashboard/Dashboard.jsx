import React, { useEffect, useContext } from "react";
import { GetContext } from "../../../../Context/GetContext";
import Card from "../../../../Components/Card";
import Title from "../../../../Components/Title";
import { FaCoffee, FaBeer } from "react-icons/fa";
import { IoCodeWorking } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import { CgSandClock } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";

const Dashboard = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { getJumlahDaftar } = handleGet;
  const { jumlah } = stateGet;

  useEffect(() => {
    getJumlahDaftar();
  }, []);

  const card = [
    {
      title: "Jumlah Pelamar",
      icon: <FaPeopleGroup size="70px" />,
      bgColor: "gradient-to-b from-blue-200 to-blue-300",
      amount: jumlah.total,
    },
    {
      title: "Pendaftar Baru",
      icon: <CgSandClock size="70px" />,
      bgColor: "gradient-to-b from-amber-300 to-amber-200",
      amount: jumlah.menunggu,
    },
    {
      title: "Diterima Magang",
      icon: <FaCoffee size="70px" />,
      bgColor: "gradient-to-b from-sky-400 to-sky-300",
      amount: jumlah.diterima,
    },
    {
      title: "Aktif Magang",
      icon: <IoCodeWorking size="70px" />,
      bgColor: "gradient-to-b from-emerald-300 to-emerald-200",
      amount: jumlah.aktif,
    },
    {
      title: "Selesai Magang",
      icon: <FiCheckSquare size="70px" />,
      bgColor: "gradient-to-b from-blue-200 to-blue-300",
      amount: jumlah.selesai,
    },
  ];

  return (
    <>
      <Title>Dashboard</Title>
      <div className="w-full h-full bg-blue-50 p-10 mt-10 rounded-lg flex gap-5 justify-between items-center flex-col md:flex-row md:flex-wrap">
        {card.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
