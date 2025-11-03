import footer_logo from "../assets/logo_big.png";
import { FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full">
      <hr className="w-[100%] mx-auto border-0 h-[1px] bg-[#c7c7c7]" />
      <div className="flex flex-col justify-center items-center gap-[15px] sm:gap-[20px] bg-[#fafafa] py-[10px] px-4">
        <div className="flex items-center gap-[15px] sm:gap-[20px]">
          <img src={footer_logo} alt="" className="w-[40px] sm:w-[50px]" />
          <p className="text-[#383838] text-[20px] sm:text-[25px] font-[700]">
            SHOPPER
          </p>
        </div>
        <ul className="flex flex-wrap justify-center list-none gap-[20px] sm:gap-[35px] lg:gap-[50px] text-[#252525] text-[13px] sm:text-[14px] lg:text-[15px]">
          <li className="cursor-pointer hover:text-red-600">Men</li>
          <li className="cursor-pointer hover:text-red-600">Women</li>
          <li className="cursor-pointer hover:text-red-600">Kids</li>
          <li className="cursor-pointer hover:text-red-600">About</li>
          <li className="cursor-pointer hover:text-red-600">Contact</li>
        </ul>
        <div className="flex gap-[25px] sm:gap-[35px] lg:gap-[40px]">
          <div className="p-[8px] sm:p-[10px] pb-[6px] cursor-pointer">
            <FaInstagram className="w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] text-[#252525] hover:text-[#E4405F] transition-colors duration-300 hover:scale-[1.2] transition-transform duration-[0.6s]" />
          </div>
          <div className="p-[8px] sm:p-[10px] pb-[6px] cursor-pointer">
            <FaPinterest className="w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] text-[#252525] hover:text-[#E60023] transition-colors duration-300 hover:scale-[1.2] transition-transform duration-[0.6s]" />
          </div>
          <div className="p-[8px] sm:p-[10px] pb-[6px] cursor-pointer">
            <FaWhatsapp className="w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] text-[#252525] hover:text-[#25D366] transition-colors duration-300 hover:scale-[1.2] transition-transform duration-[0.6s]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-[-50px] h-[70px] text-[#1a1a1a] text-[14px] sm:text-[16px] lg:text-[18px] bg-red-500 px-4">
        <p className="text-center">Copyright @2025 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
