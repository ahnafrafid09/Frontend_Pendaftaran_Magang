import React from "react";

const TextInput = (props) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <label htmlFor={props.id} className="font-lato font-bold">
        {props.label}
      </label>
      <input
        value={props.value}
        type="text"
        id={props.id}
        placeholder={props.placeHolder}
        className="w-64 h-10 border border-netral-black rounded-md px-4"
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextInput;
