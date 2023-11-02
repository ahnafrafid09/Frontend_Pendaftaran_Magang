import React from 'react'

const FileInput = (props) => {
  return (
    <div className='flex flex-col gap-y-2.5 w-64'>
      <label htmlFor={props.id} className="font-bold font-lato">{props.label}</label>
      <input
        type="file"
        id={props.id}
        className="bg-white border border-netral-black rounded-md"
        onChange={props.onChange}
      />
    </div>
  )
}

export default FileInput