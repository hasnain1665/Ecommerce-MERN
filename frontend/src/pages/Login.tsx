const Signup = () => {
  return (
    <div className="w-full min-h-screen bg-[#fce3fe] flex items-center justify-center p-0 m-0">
      <div className="w-[50%] max-h-[100vh] bg-white py-[40px] px-[60px] rounded-[4px] shadow-lg my-[70px]">
        <h1 className="my-[20px] mx-[0px] text-[25px] font-[700] text-center">
          Log In
        </h1>
        <div className="flex flex-col gap-[29px] mt-[30px]">
          <input
            type="text"
            placeholder="Your Name"
            className="h-[50px] w-[100%] ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] rounded-[4px]"
          />
          <input
            type="email"
            placeholder="Your Email Address"
            className="h-[50px] w-[100%] ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] rounded-[4px]"
          />
          <input
            type="password"
            placeholder="Password"
            className="h-[50px] w-[100%] ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] rounded-[4px]"
          />
        </div>
        <button className="w-[100%] h-[60px] text-white bg-[#ff4141] mt-[30px] border-none text-[24px] font-[500] cursor-pointer rounded-[4px] hover:bg-transparent hover:text-black hover:border-[1px] hover:border-solid hover:border-[#c9c9c9] transition-all">
          Register
        </button>
        <p className="mt-[20px] text-[#5c5c5c] text-[18px] font-[500]">
          Already have an account?{" "}
          <span className="text-[#ff4141] font-[600] cursor-pointer">
            Login here
          </span>
        </p>
        <div className="flex items-center mt-[25px] gap-[10px] text-[#5c5c5c] text-[16px] font-[500]">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
