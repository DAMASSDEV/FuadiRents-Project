import React from 'react'

function Input({type = "text", placeholder, onChange, value}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="rounded-2xl w-lg min-h-[83px] bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] ml-[72px] mt-[51px] placeholder:font-normal placeholder:text-3xl text-4xl pl-[37px]"
    />
  );

}

export default Input