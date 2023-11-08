import React from "react";
import Select from "react-select";

const DropdownInput = (props) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <label className="font-bold font-lato">{props.label}</label>
      <select
        id={props.id}
        className="w-64 bg-transparent h-10 border border-black rounded-md px-4"
        value={props.value}
        onChange={props.handleChange}
      >
        <option value="">{props.title}</option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
