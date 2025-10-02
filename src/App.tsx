import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import OTPPage from "./pages/OTPPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/otp" element={<OTPPage />} />
      </Routes>
    </Router>
  );
}

export default App;
