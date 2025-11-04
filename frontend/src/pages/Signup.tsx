import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-full min-h-screen bg-[#fce3fe] flex items-center justify-center p-4">
      <div className="w-full sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-w-[550px] bg-white py-[30px] sm:py-[35px] lg:py-[40px] px-[20px] sm:px-[40px] lg:px-[60px] rounded-[4px] shadow-lg my-[40px] sm:my-[50px] lg:my-[70px]">
        <h1 className="my-[15px] sm:my-[20px] mx-[0px] text-[22px] sm:text-[24px] lg:text-[25px] font-[700] text-center">
          Sign Up
        </h1>
        <div className="flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[29px] mt-[25px] sm:mt-[28px] lg:mt-[30px]">
          <input
            type="text"
            placeholder="Your Name"
            className="h-[45px] sm:h-[48px] lg:h-[50px] w-[100%] ps-[15px] sm:ps-[18px] lg:ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[15px] sm:text-[16px] lg:text-[18px] rounded-[4px] focus:border-[#ff4141]"
          />
          <input
            type="email"
            placeholder="Your Email Address"
            className="h-[45px] sm:h-[48px] lg:h-[50px] w-[100%] ps-[15px] sm:ps-[18px] lg:ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[15px] sm:text-[16px] lg:text-[18px] rounded-[4px] focus:border-[#ff4141]"
          />
          <input
            type="password"
            placeholder="Password"
            className="h-[45px] sm:h-[48px] lg:h-[50px] w-[100%] ps-[15px] sm:ps-[18px] lg:ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[15px] sm:text-[16px] lg:text-[18px] rounded-[4px] focus:border-[#ff4141]"
          />
        </div>
        <button className="w-[100%] h-[50px] sm:h-[55px] lg:h-[60px] text-white bg-[#ff4141] mt-[25px] sm:mt-[28px] lg:mt-[30px] border-none text-[18px] sm:text-[20px] lg:text-[22px] font-[500] cursor-pointer rounded-[4px] hover:bg-[#e63939] transition-all">
          Register
        </button>
        <p className="mt-[18px] sm:mt-[20px] text-[#5c5c5c] text-[15px] sm:text-[16px] lg:text-[17px] font-[500]">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#ff4141] font-[600] cursor-pointer hover:underline">
              Login here
            </span>
          </Link>
        </p>
        <div className="flex items-start sm:items-center mt-[20px] sm:mt-[25px] gap-[10px] text-[#5c5c5c] text-[13px] sm:text-[14px] lg:text-[15px] font-[500]">
          <input
            type="checkbox"
            name=""
            id=""
            className="mt-[2px] sm:mt-0 flex-shrink-0"
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
