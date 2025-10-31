import {
  Navbar,
  //Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import logo from "../assets/logo.png";
// import cart_icon from "../assets/cart_icon.png";
import { FiShoppingCart } from "react-icons/fi";

import { Link } from "react-router-dom";

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
        className={`flex flex-col items-center justify-center gap-[30px] transition-all duration-300 border-b-2 ${
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
}

function NavList({ activeItem, setActiveItem }: NavListProps) {
  const navItems = ["Shop", "Men", "Women", "Kids"];
  const paths = ["/", "/men", "/women", "/kids"];
  return (
    <ul className="flex items-center gap-[50px] text-black text-[15px] font-[500]">
      {navItems.map((item, index) => (
        <NavItem
          key={item}
          label={item}
          isActive={activeItem === item}
          onClick={() => setActiveItem(item)}
          path={paths[index]}
        />
      ))}
    </ul>
  );
}

const AppNavBar = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Shop");

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <Navbar
      color="transparent"
      fullWidth
      placeholder={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="container mx-auto flex items-center justify-around p-[16px] shadow-[0_1px_3px_-2px_rgb(0,0,0)]">
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
          <NavList activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
        <div className="flex items-center gap-[45px]">
          <Link to="/login">
            <Button
              className="w-[100px] h-[35px] border-solid border-[1px] border-[#7a7a7a] rounded-[75px] text-[#515151] text-[18px] font-[500] cursor-pointer hover:bg-red-500 hover:text-white"
              placeholder={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Sign in
            </Button>
          </Link>
          <Link to="/cart">
            <div className="relative group">
              <div className="p-2 rounded-full transition-all duration-300 group-hover:bg-red-50">
                <FiShoppingCart className="w-[28px] h-[28px] text-[#515151] transition-all duration-300 group-hover:text-red-500 group-hover:scale-110" />
              </div>
              <div className="absolute top-[-3px] right-[-3px] w-[18px] h-[18px] flex items-center justify-center border rounded-full text-[12px] text-white bg-red-500 transition-all duration-300 group-hover:scale-110">
                0
              </div>
            </div>
          </Link>
        </div>
        <IconButton
          size="sm"
          variant="text"
          color="blue-gray"
          onClick={handleOpen}
          className="ml-auto inline-block text-blue-gray-900 lg:hidden"
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
        </IconButton>
      </div>
      {/* <Collapse open={open} className="lg:hidden">
        <div className="mt-2 rounded-xl bg-white py-2">
          <NavList />
          <Button
            className="mb-2"
            fullWidth
            placeholder={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Sign in
          </Button>
        </div>
      </Collapse> */}
    </Navbar>
  );
};

export default AppNavBar;
