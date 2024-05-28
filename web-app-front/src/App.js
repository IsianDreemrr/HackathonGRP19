import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Predictions from "./pages/Predictions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictions" element={<Predictions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
