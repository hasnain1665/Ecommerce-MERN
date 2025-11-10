import { Button, Typography } from "@material-tailwind/react";
import exclusive_image from "../assets/exclusive_image.png";

const Offers = () => {
  return (
    <div
      className="w-[90%] sm:w-[85%] lg:w-[90%] min-h-[50vh] lg:max-h-[60vh] flex flex-col 
    lg:flex-row m-auto my-[80px] sm:my-[120px] lg:my-[150px] bg-[linear-gradient(180deg,#fde1ff,#e1ffea22_60%)] rounded-lg"
    >
      <div className="flex flex-1 flex-col justify-center px-6 sm:px-12 lg:pl-[80px] py-8 lg:py-0">
        <h1 className="text-[#171717] text-[28px] sm:text-[35px] lg:text-[40px] font-[600]">
          Exclusive
        </h1>
        <h1 className="text-[#171717] text-[28px] sm:text-[35px] lg:text-[40px] font-[600]">
          Offers For You
        </h1>
        <Typography
          className="text-[#171717] text-[14px] sm:text-[15px] lg:text-[16px] font-[500] mt-2"
          placeholder={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          ONLY ON BEST SELLERS PRODUCTS
        </Typography>
        <Button
          className="w-[180px] sm:w-[210px] p-[0px] lg:w-[230px] h-[38px] sm:h-[40px] rounded-[35px] 
          bg-[#ff4141] text-white text-[16px] sm:text-[17px] lg:text-[18px] font-[500] mt-[20px] 
          sm:mt-[25px] lg:mt-[30px] cursor-pointer hover:bg-[#e63939]"
          placeholder={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() =>
            document.getElementById("new-collections")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Check Now
        </Button>
      </div>
      <div
        className="flex flex-1 items-center justify-center lg:justify-end px-6 sm:px-12 lg:pt-[50px] 
      lg:pr-[70px] pb-8 lg:pb-0"
      >
        <img
          src={exclusive_image}
          alt=""
          className="max-h-[250px] sm:max-h-[350px] lg:max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Offers;
