// Main.js
import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";

function Main() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-between w-full h-screen bg-top bg-no-repeat"
      style={{ backgroundImage: `url('/Frame.svg')` }}
    >
      <div className="flex flex-col items-center mt-[84px]">
        <img src={logo} alt="Logo" />
        <div className="mt-[54px] text-[1.25rem] font-semibold">
          이번 여정은 원소찾기 테스트입니다
        </div>
        <div className="mt-[8px] text-[0.875rem] text-[#cecece] text-center font-normal">
          나와 상성이 맞는 원소와 화학반응을 일으켜 <br /> 배움과 실험과 도전의
          불씨를 지펴보세요
        </div>
      </div>
      <button
        className="mb-[108px] bg-[#03A3FF] px-[112.5px] py-[15px] text-[1rem] rounded-[40px]"
        onClick={() => navigate("/test")}
      >
        테스트 하러 가기
      </button>
    </div>
  );
}

export default Main;
