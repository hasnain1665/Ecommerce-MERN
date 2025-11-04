import { Typography, Button, Collapse } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
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
  setOpen: (open: boolean) => void;
}

function NavList({ activeItem, setActiveItem, setOpen }: NavListProps) {
  const navItems = ["Shop", "Men", "Women", "Kids"];
  const paths = ["/", "/men", "/women", "/kids"];
  return (
    <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-[50px] text-black text-[15px] font-[500]">
      {navItems.map((item, index) => (
        <NavItem
          key={item}
          label={item}
          isActive={activeItem === item}
          onClick={() => {
            setActiveItem(item);
            setOpen(false);
          }}
          path={paths[index]}
        />
      ))}
    </ul>
  );
}

const AppNavBar = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Shop");

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div>
      <div className="mx-[5px] lg:mx-auto flex items-center justify-between lg:justify-around p-[16px] shadow-[0_1px_3px_-2px_rgb(0,0,0)]">
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
          />
        </div>
        <div className="flex items-center gap-[25px]">
          <Link
            to="/login"
            className="hidden lg:block"
            onClick={() => setActiveItem("")}
          >
            <Button
              className="w-[110px] h-[35px] p-[0px] border-solid border-[1px] border-[#7a7a7a] rounded-[5px] text-[#515151] text-[18px] font-[500] cursor-pointer hover:bg-red-500 hover:text-white"
              placeholder={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Sign in
            </Button>
          </Link>
          <Link to="/cart" onClick={() => setActiveItem("")}>
            <div className="relative group">
              <div className="p-2 rounded-full transition-all duration-300 group-hover:bg-red-50">
                <FiShoppingCart className="w-[28px] h-[28px] text-[#515151] transition-all duration-300 group-hover:text-red-500 group-hover:scale-110" />
              </div>
              <div className="absolute top-[-3px] right-[-3px] w-[18px] h-[18px] flex items-center justify-center border rounded-full text-[12px] text-white bg-red-500 transition-all duration-300 group-hover:scale-110">
                0
              </div>
            </div>
          </Link>
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
            />
            <div className="flex justify-center mt-4 pb-2">
              <Link
                to="/login"
                onClick={() => {
                  setOpen(false);
                  setActiveItem("");
                }}
              >
                <Button
                  className="w-[110px] h-[35px] p-[0px] border-solid border-[1px] border-[#7a7a7a] rounded-[5px] text-[#515151] text-[18px] font-[500] cursor-pointer hover:bg-red-500 hover:text-white"
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default AppNavBar;
