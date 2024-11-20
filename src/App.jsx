import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Test from "./pages/Test";
import Result from "./pages/Result";
import { ResultProvider } from "./context/ResultContext";

function App() {
  return (
    <ResultProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/result" element={<Result />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </ResultProvider>
  );
}

export default App;
