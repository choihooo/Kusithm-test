import React from "react";

function NavBar({ onBack }) {
  return (
    <header className="h-[52px] w-full flex items-center px-4 relative">
      <button onClick={onBack} className="absolute left-4">
        <img src="/left.svg" alt="뒤로 가기" className="w-6 h-6" />
      </button>
      <div className="mx-auto text-[16px] font-semibold text-center">
        원소 테스트
      </div>
    </header>
  );
}

export default NavBar;
