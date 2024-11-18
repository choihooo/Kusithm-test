import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Test from "./pages/Test";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
