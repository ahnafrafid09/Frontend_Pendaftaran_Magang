import React from "react";
import SubTitle from "../../../../../Components/SubTitle";

const Catatan = ({ alasan }) => {
  return (
    <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="flex gap-2 items-center">
        <SubTitle>Catatan</SubTitle>
      </div>
      <div className="mt-4">
        <textarea
          name="Catatan"
          id="catatan"
          className="w-full bg-transparent h-28 py-5 px-6 border border-netral-black rounded"
          value={alasan.alasan_tolak}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default Catatan;
