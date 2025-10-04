import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import OTPPage from "./pages/OTPPage";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "./constant/toastConfig";
import FullName from "./pages/FullName";
import { API_ROUTES } from "./constant/routes";

function App() {


  return (
    <Router>
      <Routes>
        <Route path={API_ROUTES.HOME} element={<HomePage />} />
        <Route path={API_ROUTES.OTP} element={<OTPPage />} />
        <Route path={API_ROUTES.FULL_NAME} element={<FullName />} />
      </Routes>
      <Toaster position="top-center" toastOptions={toastConfig} />
    </Router>
  );
}

export default App;
