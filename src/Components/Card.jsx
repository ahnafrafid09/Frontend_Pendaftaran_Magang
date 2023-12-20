import React from "react";

const Card = ({ title, amount, icon, bgColor }) => {
  return (
    <div
      className={`w-[250px] h-[150px] rounded-lg overflow-hidden shadow-xl m-2 bg-${bgColor}`}
    >
      <div className="flex items-center justify-between w-full h-full px-5">
        <div className="flex flex-col">
          <p className="text-black font-lato">{title}</p>
          <h1 className="text-black font-semibold font-roboto text-2xl">
            {amount}
          </h1>
        </div>
        <div className="text-blue-900">{icon}</div>
      </div>
    </div>
  );
};

export default Card;
