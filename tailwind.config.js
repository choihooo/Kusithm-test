/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내부의 모든 파일들에 대해 적용
  ],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ["Pretendard", "sans-serif"],
      },
      fontFamily: {
        helvetica: ["Helvetica Inserat LT Std", "sans-serif"], // 폰트 추가
      },
    },
  },
  plugins: [],
};
