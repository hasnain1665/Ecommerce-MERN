const NewsLetter = () => {
  return (
    <div className="w-[90%] sm:w-[85%] lg:w-[90%] flex flex-col items-center justify-center mx-auto mb-[80px] sm:mb-[110px] lg:mb-[140px] bg-[linear-gradient(180deg,#fde1ff,#e1ffea22_60%)] gap-[20px] sm:gap-[25px] lg:gap-[30px] px-4 rounded-lg">
      <h1 className="text-[#454545] text-[22px] sm:text-[32px] lg:text-[45px] font-[600] pt-[40px] sm:pt-[50px] lg:pt-[60px] text-center leading-tight">
        Get Exclusive Offers On Your Email
      </h1>
      <p className="text-[#454545] text-[14px] sm:text-[17px] lg:text-[20px] text-center">
        Subscribe to our newsletter and stay updated
      </p>
      <div className="flex flex-row items-center justify-between bg-white w-[300px] sm:w-[500px] lg:w-[630px] sm:h-[50px] border-solid border-[1px] border-[#7a7a7a] rounded-[80px] overflow-hidden mb-8 sm:mb-0">
        <input
          type="email"
          placeholder="Your Email"
          className="w-[200px] sm:w-[340px] lg:w-[500px] px-6 sm:ms-[10px] py-3 sm:py-0 border-none text-[#616161] text-[14px] sm:text-[16px] outline-none"
        />
        <button className="w-[100px] sm:w-[140px] lg:w-[160px] h-[45px] sm:h-[50px] rounded-[80px] bg-black text-[14px] sm:text-[16px] text-white cursor-pointer hover:bg-[#252525] transition-all">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
