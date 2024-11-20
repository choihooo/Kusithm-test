import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

export const useResult = () => useContext(ResultContext);

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState(null); // 초기값을 null로 설정

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};
