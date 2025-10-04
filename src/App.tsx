import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import OTPPage from "./pages/OTPPage";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "./constant/toastConfig";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/otp" element={<OTPPage />} />
      </Routes>
      <Toaster position="top-center" toastOptions={toastConfig} />
    </Router>
  );
}

export default App;
