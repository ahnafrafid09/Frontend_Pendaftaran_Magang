import React from 'react'

const DateInput = (params) => {
  return (
    <div className='flex flex-col gap-y-2.5 w-64'>
      <label htmlFor={params.id} className="font-bold font-lato">{params.label}</label>
      <input
        type="date"
        id={params.id}
        className="border border-gray-300 rounded-md px-5 py-2"
        value={params.value}
        onChange={params.onChange}
      />
    </div>
  )
}

export default DateInput