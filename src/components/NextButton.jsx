import React from "react";

function NextButton({ isDisabled, onClick }) {
  return (
    <button
      className={`flex w-[342px] h-[56px] px-[40px] py-[16px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[40px] text-[16px]  transition ${
        isDisabled
          ? "bg-[#232323] text-gray-400 cursor-not-allowed"
          : "bg-[#03A3FF] text-white"
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      다음
    </button>
  );
}

export default NextButton;
