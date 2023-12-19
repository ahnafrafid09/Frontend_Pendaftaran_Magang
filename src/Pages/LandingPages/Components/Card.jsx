import React from "react";

const Card = ({ icon, judul, text }) => {
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-72 p-6 bg-blue-100 border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 bg-blue-900 flex items-center justify-center rounded-full">
          <img
            src={icon}
            alt="icon"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
          />
        </div>
        <h5 className="mt-2 text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-blue-900 font-roboto text-center">
          {judul}
        </h5>
        <p className="my-5 text-base lg:text-lg font-normal text-black text-center font-lato">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Card;
