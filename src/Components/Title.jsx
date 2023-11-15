import React from "react";

const Title = (props) => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold font-roboto">
        {props.children}
      </h1>
    </>
  );
};

export default Title;
