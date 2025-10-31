import hand_icon from "../assets/hand_icon.png";
import arrow_icon from "../assets/arrow.png";
import hero_image from "../assets/hero_image.png";

const Hero = () => {
  return (
    <div className="flex h-[100vh] bg-[linear-gradient(180deg,#fde1ff,#e1ffea22_60%)]">
      <div className=" flex flex-1 flex-col justify-center gap-[20px] ps-[140px] leading-[1.1]">
        <h2 className="text-[#090909] text-[26px] font-[600]">
          NEW ARRIVALS ONLY
        </h2>
        <div>
          <div className="flex items-center gap-[20px]">
            <p className="text-[#171717] text-[40px] font-[700]">new</p>
            <img src={hand_icon} alt="" className="w-[95px]" />
          </div>
          <p className="text-[#171717] text-[40px] font-[700]">collections</p>
          <p className="text-[#171717] text-[40px] font-[700]">for everyone</p>
        </div>
        <div className="flex justify-center items-center gap-[15px] w-[280px] h-[60px] rounded-[75px] mt-[30px] bg-[#ff4141] text-white text-[22px] font-[500] cursor-pointer">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <img
          src={hero_image}
          alt=""
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
