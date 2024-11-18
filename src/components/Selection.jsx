import React from "react";

const Selection = ({ text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-[16px] flex w-[342px] h-[74px] px-[16px] py-[24px] justify-center items-center gap-[10px] flex-shrink-0 rounded-lg transition whitespace-pre-line ${
        isSelected
          ? "border-[1.5px] border-[rgba(3,163,255,0.20)] bg-[rgba(3,163,255,0.10)]"
          : "bg-[#232323]"
      } ${isSelected ? "text-[#03A3FF]" : "text-white"}`}
    >
      {text}
    </div>
  );
};

export default Selection;
