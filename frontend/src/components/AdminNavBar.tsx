import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import navLogo from "../assets/nav-logo.svg";
import { API } from "../api";

const AdminNavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.post("/users/logout");
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-[12px] sm:py-[15px] px-4 sm:px-8 lg:px-[60px] shadow-[0_1px_3px_-2px_rgb(0,0,0)] mb-[1px] bg-white">
      <img
        src={navLogo}
        alt="Admin Logo"
        className="w-[120px] sm:w-[160px] lg:w-[200px]"
      />
      <div className="relative">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 sm:gap-4 cursor-pointer"
        >
          <div className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] lg:w-[45px] lg:h-[45px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
            <FiUser className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] lg:w-[22px] lg:h-[22px] text-[#454545]" />
          </div>
          <span className="hidden sm:inline text-[14px] sm:text-[15px] font-[500] text-[#454545]">
            {user?.fullname || "Admin"}
          </span>
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-red-600 hover:bg-red-50 transition-all"
            >
              <FiLogOut className="w-[16px] h-[16px]" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavBar;
