import LoginIcon from "../assets/icon/logo.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex justify-center py-10">
      <div className="bg-[#F6F6F8] w-[375px] rounded-lg relative">
        <div className="bg-[#017785] h-[207px] flex justify-center items-start p-4 rounded-b-[15px]">
          <img src={LoginIcon} alt="logo" width={47} height={62} />
        </div>
        <div className="bg-white h-[281px] rounded-[10px] absolute top-[97px] left-0 right-0 bottom-0 mx-6 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
