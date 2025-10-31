import footer_logo from "../assets/logo_big.png";
// import instagram_icon from "../assets/instagram_icon.png";
import { FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <hr className="w-[100%] mx-auto border-0 h-[1px] bg-[#c7c7c7]" />
      <div className="flex flex-col justify-center items-center gap-[20px] bg-[#fafafa] py-[10px]">
        <div className="flex items-center gap-[20px]">
          <img src={footer_logo} alt="" />
          <p className="text-[#383838] text-[25px] font-[700]">SHOPPER</p>
        </div>
        <ul className="flex list-none gap-[50px] text-[#252525] text-[15px]">
          <li className="cursor-pointer hover:text-red-600">Men</li>
          <li className="cursor-pointer hover:text-red-600">Women</li>
          <li className="cursor-pointer hover:text-red-600">Kids</li>
          <li className="cursor-pointer hover:text-red-600">About</li>
          <li className="cursor-pointer hover:text-red-600">Contact</li>
        </ul>
        <div className="flex gap-[40px]">
          <div className="p-[10px] pb-[6px] cursor-pointer">
            <FaInstagram className="w-[30px] h-[30px] text-[#252525] hover:text-[#E4405F] transition-colors duration-300 hover:scale-[1.2] transition-transform duration-[0.6s]" />
          </div>
          <div className="p-[10px] pb-[6px] cursor-pointer">
            <FaPinterest className="w-[30px] h-[30px] text-[#252525] hover:text-[#E60023] transition-colors duration-300 hover:scale-[1.2] transition-transform duration-[0.6s]" />
          </div>
          <div className="p-[10px] pb-[6px] cursor-pointer">
            <FaWhatsapp className="w-[30px] h-[30px] text-[#252525] hover:text-[#25D366] transition-colors duration-300 hover:scale-[1.2] transition-transform duration-[0.6s]" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[30px] w-[100%] mb-[-50px] h-[70px] text-[#1a1a1a] text-[18px] bg-red-500">
          <p>Copyright @2025 - All Right Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
