import { Typography, Button, Collapse } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import logo from "../assets/logo.png";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { API } from "../api";

interface Category {
  _id: string;
  name: string;
}

interface NavItemPropsType {
  label: string;
  isActive: boolean;
  onClick: () => void;
  path: string;
}

function NavItem({ label, isActive, onClick, path }: NavItemPropsType) {
  return (
    <Link
      to={path}
      onClick={() => {
        onClick();
      }}
    >
      <Typography
        as="li"
        color="blue-gray"
        className={`flex flex-col items-center justify-center gap-[30px] transition-all duration-300 
          border-b-2 ${
            isActive
              ? "border-red-600 text-red-600"
              : "border-transparent hover:text-red-600"
          }`}
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {label}
      </Typography>
    </Link>
  );
}

interface NavListProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  setOpen: (open: boolean) => void;
  categories: Category[];
}

function NavList({ setActiveItem, setOpen, categories }: NavListProps) {
  const location = useLocation();

  const navItems = [
    { label: "Shop", path: "/" },
    ...categories.map((cat) => ({
      label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
      path: `/${cat.name}`,
    })),
  ];

  return (
    <ul
      className="flex flex-col lg:flex-row items-center gap-6 lg:gap-[50px] text-black text-[15px] 
    font-[500]"
    >
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path === "/" && location.pathname === "/");

        return (
          <NavItem
            key={item.label}
            label={item.label}
            isActive={isActive}
            onClick={() => {
              setActiveItem(item.label);
              setOpen(false);
            }}
            path={item.path}
          />
        );
      })}
    </ul>
  );
}

const AppNavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Shop");
  const { categories } = useSelector((state: RootState) => state.categories);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await API.post("/users/logout");
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div>
      <div
        className="mx-[5px] lg:mx-auto flex items-center justify-between lg:justify-between py-[12px] lg:px-[45px] 
      shadow-[0_1px_3px_-2px_rgb(0,0,0)]"
      >
        <div className="flex items-center gap-[10px]">
          <img src={logo} alt="Company Logo" />
          <Typography
            className="text-[#171717] text-[25px] font-[600]"
            placeholder={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            SHOPPER
          </Typography>
        </div>
        <div className="hidden lg:block">
          <NavList
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            setOpen={setOpen}
            categories={categories}
          />
        </div>
        <div className="flex items-center gap-[25px]">
          <Link to="/cart" onClick={() => setActiveItem("")}>
            <div className="relative group">
              <div className="p-2 rounded-full transition-all duration-300 group-hover:bg-red-50">
                <FiShoppingCart
                  className="w-[28px] h-[28px] text-[#515151] transition-all duration-300 
                group-hover:text-red-500 group-hover:scale-110"
                />
              </div>
              <div
                className="absolute top-[-3px] right-[-3px] w-[18px] h-[18px] flex items-center 
              justify-center border rounded-full text-[12px] text-white bg-red-500 transition-all
              duration-300 group-hover:scale-110"
              >
                {user ? cartItems.length : 0}
              </div>
            </div>
          </Link>
          <div className="hidden lg:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="text-[#515151] text-[18px] font-[500] hover:text-red-500 transition-all 
                cursor-pointer"
                >
                  {user.fullname || "User"}
                </button>

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
            ) : (
              <Link to="/login" onClick={() => setActiveItem("")}>
                <Button
                  className="w-[110px] h-[35px] p-[0px] border-solid border-[1px] border-[#7a7a7a] 
                rounded-[5px] text-[#515151] text-[18px] font-[500] cursor-pointer hover:bg-red-500 
                hover:text-white"
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
          <Button
            onClick={handleOpen}
            className="w-auto h-auto text-[#515151] text-[18px] font-[500] cursor-pointer lg:hidden p-[0px]"
            placeholder={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </Button>
        </div>
      </div>
      <Collapse open={open}>
        {open && (
          <div className="lg:hidden mx-auto py-2">
            <NavList
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              setOpen={setOpen}
              categories={categories}
            />
            <div className="flex justify-center mt-4 pb-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-3 px-4 py-2 text-[14px] text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                >
                  <FiLogOut className="w-[16px] h-[16px]" />
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={() => setActiveItem("")}>
                  <Button
                    className="w-[110px] h-[35px] p-[0px] border-solid border-[1px] border-[#7a7a7a] 
                rounded-[5px] text-[#515151] text-[18px] font-[500] cursor-pointer hover:bg-red-500 
                hover:text-white"
                    placeholder={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default AppNavBar;
