import hand_icon from "../assets/hand_icon.png";
import hero_image from "../assets/hero_image.png";

const Hero = () => {
  return (
    <div
      className="flex flex-col lg:flex-row min-h-[60vh] lg:h-[100vh] 
    bg-[linear-gradient(180deg,#fde1ff,#e1ffea22_60%)]"
    >
      <div
        className="flex flex-1 flex-col justify-center gap-[15px] sm:gap-[20px] 
      px-6 sm:px-12 lg:ps-[140px] leading-[1.1] pt-8 lg:pt-0"
      >
        <h2 className="text-[#090909] text-[18px] sm:text-[22px] lg:text-[26px] font-[600]">
          NEW ARRIVALS ONLY
        </h2>
        <div>
          <div className="flex items-center gap-[15px] sm:gap-[20px]">
            <p className="text-[#171717] text-[28px] sm:text-[35px] lg:text-[40px] font-[700]">
              new
            </p>
            <img
              src={hand_icon}
              alt=""
              className="w-[60px] sm:w-[75px] lg:w-[95px]"
            />
          </div>
          <p className="text-[#171717] text-[28px] sm:text-[35px] lg:text-[40px] font-[700]">
            collections
          </p>
          <p className="text-[#171717] text-[28px] sm:text-[35px] lg:text-[40px] font-[700]">
            for everyone
          </p>
        </div>
        <div
          className="flex justify-center items-center gap-[12px] sm:gap-[15px] w-[180px] sm:w-[220px] 
          lg:w-[250px] h-[50px] sm:h-[55px] lg:h-[60px] rounded-[75px] mt-[20px] sm:mt-[25px] lg:mt-[30px] 
          bg-[#ff4141] text-white text-[16px] sm:text-[19px] lg:text-[22px] font-[500] cursor-pointer 
          hover:bg-[#e63939] transition-all"
          onClick={() =>
            document.getElementById("new-collections")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <div>Latest Collection</div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 pb-8 lg:pb-0">
        <img
          src={hero_image}
          alt=""
          className="max-h-[300px] sm:max-h-[400px] lg:max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
