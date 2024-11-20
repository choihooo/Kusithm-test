import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import domtoimage from "dom-to-image-more";
import { useResult } from "../../context/ResultContext";

function Result() {
  const { result } = useResult();
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      console.error("Invalid result data:", result);
      navigate("/"); // 데이터가 없으면 메인 화면으로 이동
    }
  }, [result, navigate]);

  // 이미지 로드 실패 방지 함수
  const handleImageError = (event) => {
    const imgElement = event.target;
    if (!imgElement.dataset.failed) {
      imgElement.dataset.failed = true; // 한 번만 대체 이미지로 교체
      imgElement.src = "/placeholder.png"; // 대체 이미지 경로
    } else {
      console.error("Image failed to load again:", imgElement.src);
    }
  };

  const downloadCapture = () => {
    const captureElement = document.querySelector(".capture");
    if (captureElement) {
      domtoimage
        .toPng(captureElement, {
          cacheBust: true, // 캐싱된 리소스 무효화
          filter: (node) => {
            if (node.tagName === "IMG") {
              const img = node;
              return img.complete && img.naturalWidth > 0; // 로드된 이미지만 포함
            }
            return true;
          },
          useCors: true, // 외부 이미지 허용
          style: {
            // 캡처 시 적용할 추가 스타일
            overflow: "visible",
          },
          scale: 2, // 고해상도 캡처
          width: captureElement.offsetWidth, // 캡처 대상의 너비
          height: captureElement.offsetHeight + 50, // 캡처 대상의 높이
        })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${result.koreanName || "result"}.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Error capturing the element:", error);
        });
    }
  };

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <p>결과를 불러올 수 없습니다. 테스트를 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* 헤더 */}
      <div className="h-[52px] flex items-center justify-between w-full px-4 py-4">
        <button className="absolute left-4 " onClick={() => navigate("/")}>
          <img src="/left.svg" alt="뒤로 가기" className="w-6 h-6" />
        </button>
        <div className="mx-auto text-[16px] font-semibold text-center">
          원소 테스트 결과
        </div>
      </div>

      {/* 결과 내용 */}
      <div className="mt-[20px] px-[32px] pt-[32px] border-none shadow-lg capture bg-[#0a0a0a] relative w-[100%] max-w-[400px] overflow-visible">
        <div className="flex flex-col border-none text-[24px]">
          <p className="border-none ">협업할 때 당신은</p>
          <h2 className=" text-4xl font-bold border-none flex gap-[12px] items-center text-[#03A3FF]">
            {result.koreanName}
            <span className=" text-primary">{result.englishName}</span>
          </h2>
          <p className="text-[24px] border-none">같은 사람이에요</p>
        </div>

        <p className="text-[14px] leading-relaxed border-none mt-[260px]">
          {result.description}
        </p>

        <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-[390px] h-[390px]">
          <img
            src="/Frame1.svg"
            alt="원소 바탕 이미지"
            className="absolute w-full h-full"
          />
          <img
            src={result.imgUrl}
            alt={`${result.koreanName} 이미지`}
            className="absolute w-[390px]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="w-full p-[16px] mt-[20px] text-[#DADADA] border-none rounded-lg bg-[#232323]">
          <div className="flex gap-[8px] text-[14px] border-none">
            <img src="/Vector.svg" className="w-[16px] h-[19px] inline-block" />
            <div className="w-full">잘 맞는 원소</div>
          </div>
          <p className="mt-2 font-semibold border-none">
            {result.fitElementName}
          </p>
          <p className="mt-1 text-sm text-[#B6B6B6] border-none">
            {result.fitElementDescription}
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-[12px] px-[12px] py-[12px] mt-[35px] mb-[28px] w-full items-center justify-center overflow-x-auto">
        <button
          onClick={() => navigate("/test")}
          className="text-white text-[14px] rounded-lg px-[6px] py-[15px] h-[50px] whitespace-nowrap"
        >
          테스트 다시하기
        </button>
        <button
          onClick={downloadCapture}
          className="text-white bg-[#03A3FF] rounded-[40px] flex items-center justify-center px-[45.5px] py-[15px] h-[50px] whitespace-nowrap"
        >
          이미지 다운받기 <img src="/download.svg" className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Result;
