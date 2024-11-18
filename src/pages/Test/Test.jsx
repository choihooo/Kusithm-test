import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar.jsx";
import NextButton from "../../components/NextButton.jsx";
import Selection from "../../components/Selection.jsx";

const questions = [
  {
    id: 1,
    question:
      "꿈 속에서 게미와 꿀벌의 입에 물을 두고\n옥신각신 하고 있는 상황을 본 당신!",
    options: [
      "공평하게 반반 갈라주고 싸움을 중단시킨다.",
      "마침 배고팠으니 내가 빼앗아 먹는다.",
    ],
  },
  {
    id: 2,
    question: "배가 고파서 밥을 먹으러 가는 우리,\n내가 알아본 식당은?",
    options: [
      "맛있다는 곳 한 군데만 알아본다.",
      "분수가 생길지도 모르니 근처에 이상 알아본다.",
    ],
  },
  {
    id: 3,
    question: "아침 밤, 늦게까지 팀플을 하다가\n괴담 이야기가 시작됐다.",
    options: [
      "흥미진진하게 듣으며 이야기에 빠져들었다.",
      "이야기에 빠져든 친구들을 무섭게 놀렸다.",
    ],
  },
  {
    id: 4,
    question: "팀플을 성공적으로 마치고,\n친구의 이 말에 기분이 좋아졌다.",
    options: [
      "너랑 같은 팀이라서 너무 행복했어",
      "너가 똑똑해서 같은 팀하면 A+ 따놓은 것 같아",
    ],
  },
  {
    id: 5,
    question: "팀플 중에\n초능력 드라마 얘기가 나왔다.",
    options: [
      "초능력에 초점을 두고 얘기한다.",
      "드라마가 재밌었지만 초점을 두고 얘기한다.",
    ],
  },
  {
    id: 6,
    question: "“너랑 팀이라 너무 행복해”라는\n친구의 말에 나는",
    options: [
      "마음이 따뜻해지며 감동 받는다.",
      "(그냥? 갑자기? 왜지? 이유가 뭘까?)",
    ],
  },
  {
    id: 7,
    question: "셋이서 노는데 옆 친구들이 의견이\n달라 싸우는 경우 나는",
    options: [
      "두 친구의 의견을 모두 듣고 부드럽게 조율한다.",
      "두 친구 모두 만족할 수 있는\n신박한 대안을 이야기한다.",
    ],
  },
];

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
      <div className="flex flex-col gap-[12px] mt-[195px] px-[24px]">
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
      <div className="fixed bottom-[60px] left-0 right-0 flex justify-center">
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
