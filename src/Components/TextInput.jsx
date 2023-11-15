import React from "react";

const TextInput = (props) => {
  const isDisabled = props.disabled === undefined ? false : props.disabled;
  const isType = props.type === undefined ? "text" : props.type;
  const isWidth = props.width === undefined ? "w-64" : props.width;
  const isHeight = props.height === undefined ? "h-10" : props.height;
  return (
    <div className="flex flex-col gap-y-2.5">
      <label htmlFor={props.id} className="font-lato font-bold">
        {props.label}
      </label>
      <input
        defaultValue={props.defaultValue}
        value={props.value}
        name={props.name}
        type={isType}
        disabled={isDisabled}
        id={props.id}
        placeholder={props.placeHolder}
        className={`${props.style} ${
          isDisabled ? "bg-transparent" : "bg-white"
        }  ${isWidth}  ${isHeight} border border-netral-black rounded-md px-4`}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextInput;
