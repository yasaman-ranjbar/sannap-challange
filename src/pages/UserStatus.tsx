import { useState, useEffect } from "react";
import { Button } from "../components/common";
import { useNavigate } from "react-router-dom";

const UserStatusPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle browser back button
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex justify-center py-10 relative">
      <div className="bg-[#017785]/40 w-[375px] min-h-[500px]  relative overflow-hidden">
        <div
          className={`bg-white space-y-4 rounded-t-[20px] h-[192px] absolute bottom-0 left-0 right-0 shadow-2xl p-6 transition-transform duration-500 ease-out ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p className="font-medium text-sm text-[#505050]">
            نماینده محترم <br />
            درخواست ثبت نام شما در حال بررسی است، در صورت تأیید اطلاعات،
            اپلیکیشن مورد نظر فعال خواهد شد.
          </p>
          <Button variant="primary" size="md" fullWidth>
            ورود با حساب کاربری دیگر
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserStatusPage;
