const NewsLetter = () => {
  return (
    <div className="w-[80%] flex flex-col items-center justify-center mx-auto mb-[140px] bg-[linear-gradient(180deg,#fde1ff,#e1ffea22_60%)] gap-[30px]">
      <h1 className="text-[#454545] text-[45px] font-[600] pt-[60px]">
        Get Exclusive Offers On Your Email
      </h1>
      <p className="text-[#454545] text-[20px]">
        Subscribe to our newsletter and stay updated
      </p>
      <div className="flex items-center justify-between bg-white w-[630px] h-[50px]  border-solid border-[1px] border-[#7a7a7a] rounded-[80px]">
        <input
          type="email"
          placeholder="Your Email"
          className="w-[500px] ms-[30px] border-none text-[#616161] text-[16px] outline-none"
        />
        <button className="w-[160px] h-[50px] rounded-[80px] bg-black text-[16px] text-white cursor-pointer">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
