import { Button, Typography } from "@material-tailwind/react";
import exclusive_image from "../assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="w-[80%] max-h-[60vh] flex m-auto my-[150px] bg-[linear-gradient(180deg,#fde1ff,#e1ffea22_60%)]">
      <div className="flex flex-1 flex-col justify-center pl-[80px]">
        <h1 className="text-[#171717] text-[40px] font-[600]">Exclusive</h1>
        <h1 className="text-[#171717] text-[40px] font-[600]">
          Offers For You
        </h1>
        <Typography
          className="text-[#171717] text-[16px] font-[500]"
          placeholder={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          ONLY ON BEST SELLERS PRODUCTS
        </Typography>
        <Button
          className="w-[230px] h-[40px] rounded-[35px] bg-[#ff4141] text-white text-[18px] font-[500] mt-[30px] cursor-pointer"
          placeholder={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Check Now
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-end pt-[50px] pr-[70px]">
        <img
          src={exclusive_image}
          alt=""
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Offers;
