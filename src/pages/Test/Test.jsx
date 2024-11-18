import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../../data/questions.json";
import NavBar from "../../components/NavBar.jsx";
import NextButton from "../../components/NextButton.jsx";
import Selection from "../../components/Selection.jsx";

function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // 번호만 저장
  const [selectedOption, setSelectedOption] = useState(null); // 현재 선택된 번호
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentQuestion === 0) {
      navigate("/"); // 첫 번째 문항에서 뒤로가기 시 메인 화면으로 이동
    } else {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(answers[currentQuestion - 1] || null); // 이전 문항 선택 유지
    }
  };

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex + 1); // 선택된 옵션 번호 저장 (1부터 시작)
  };

  const handleNext = () => {
    if (selectedOption === null) return; // 선택하지 않으면 아무 동작도 하지 않음

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = selectedOption; // 번호 저장
      return updatedAnswers;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1); // 다음 질문으로 이동
      setSelectedOption(answers[currentQuestion + 1] || null); // 다음 문항에서 선택 초기화
    } else {
      setTimeout(() => {
        console.log("모든 질문 완료:", [...answers, selectedOption]); // 최신 상태로 출력
      }, 0);
      // 결과 페이지로 이동하거나 추가 로직 실행 가능
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      {/* NavBar */}
      <NavBar onBack={handleBack} />

      {/* 질문 */}
      <div className="mt-[80px] flex flex-col items-center">
        <h1 className="text-[24px] font-bold text-center font-helvetica">
          Q{questions[currentQuestion].id}.
        </h1>
        <p className="mt-[12px] text-[20px] text-center whitespace-pre-line">
          {questions[currentQuestion].question}
        </p>
      </div>

      {/* 선택 */}
      <div className="flex flex-col gap-[12px] mt-[195px] px-[24px] w-full">
        {questions[currentQuestion].options.map((option, index) => (
          <Selection
            key={index}
            text={`${option}`}
            isSelected={selectedOption === index + 1}
            onClick={() => handleAnswer(index)}
          />
        ))}
      </div>

      {/* 다음 */}
      <div className="flex items-center justify-center w-full px-[24px] mt-[54px] pb-[60px]">
        <NextButton
          isDisabled={!selectedOption} // 선택하지 않으면 비활성화
          onClick={handleNext} // 다음 버튼 클릭 시 로직 실행
          isLastQuestion={currentQuestion === questions.length - 1} // 마지막 문항 여부
        />
      </div>
    </div>
  );
}

export default Test;
