import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResult } from "../../context/ResultContext";
import questions from "../../data/questions.json";
import Selection from "../../components/Selection";
import NextButton from "../../components/NextButton";
import NavBar from "../../components/NavBar";

function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const { setResult } = useResult(); // 전역 상태 업데이트 함수

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex + 1); // 선택된 옵션 저장
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = selectedOption;
      return updatedAnswers;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(answers[currentQuestion + 1] || null);
    } else {
      const finalAnswers = [...answers, selectedOption];

      fetch("https://kusitms-exhibition.store/api/v1/elements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selections: finalAnswers }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to submit answers");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Server response:", data); // 디버깅: 서버 응답 확인
          setResult(data.payload); // 전역 상태에 저장
          navigate("/result");
        })
        .catch((error) => {
          console.error("API 요청 중 오류 발생:", error);
        });
    }
  };

  const onBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar onBack={onBack} />
      <div
        className="flex flex-col justify-between items-center text-white max-w-[480px]"
        style={{ height: `calc(100vh - 52px)` }}
      >
        {/* 질문 */}
        <div className="mt-[80px] flex flex-col items-center">
          <h1 className="text-[24px] font-bold text-center font-helvetica">
            Q{questions[currentQuestion].id}.
          </h1>
          <p className="mt-[12px] text-[20px] font-semibold text-center whitespace-pre-line">
            {questions[currentQuestion].question}
          </p>
        </div>

        {/* 선택 */}
        <div>
          <div className="flex flex-col gap-[12px] w-[342px]">
            {questions[currentQuestion].options.map((option, index) => (
              <Selection
                key={index}
                text={option}
                isSelected={selectedOption === index + 1}
                onClick={() => handleAnswer(index)}
              />
            ))}
          </div>

          {/* 다음 버튼 */}
          <div className="flex items-center justify-center w-[342px] mt-[80px] pb-[60px]">
            <NextButton
              isDisabled={selectedOption === null}
              onClick={handleNext}
              isLastQuestion={currentQuestion === questions.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
