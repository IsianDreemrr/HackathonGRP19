import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Predictions from "./pages/Predictions";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
