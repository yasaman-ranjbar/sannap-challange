import { Button } from '../components/common';

const UserStatusPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center py-10 relative">
      <div className="bg-[#017785]/40 w-[375px] rounded-lg relative">
        <div className="bg-white space-y-4 rounded-[10px] h-[192px] absolute bottom-0 left-0 right-0 shadow-2xl p-6">
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