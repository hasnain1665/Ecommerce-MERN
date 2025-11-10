import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchAllItems } from "../redux/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await API.post("/users/login", { email, password });

      toast.success("Logged in successfully!");
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin/addproduct");
      } else {
        const redirectPath = localStorage.getItem("lastVisitedPage") || "/";
        localStorage.removeItem("lastVisitedPage");
        dispatch(fetchAllItems());
        navigate(redirectPath);
      }

      const redirectPath = localStorage.getItem("lastVisitedPage") || "/";
      localStorage.removeItem("lastVisitedPage");
      dispatch(fetchAllItems());
      navigate(redirectPath);
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#fce3fe] flex items-center justify-center p-4">
      <div className="w-full sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-w-[550px] bg-white py-[30px] sm:py-[35px] lg:py-[40px] px-[20px] sm:px-[40px] lg:px-[60px] rounded-[4px] shadow-lg my-[40px] sm:my-[50px] lg:my-[70px]">
        <h1 className="my-[15px] sm:my-[20px] mx-[0px] text-[22px] sm:text-[24px] lg:text-[25px] font-[700] text-center">
          Log In
        </h1>
        <div className="flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[29px] mt-[25px] sm:mt-[28px] lg:mt-[30px]">
          <input
            type="email"
            placeholder="Your Email Address"
            className="h-[45px] sm:h-[48px] lg:h-[50px] w-[100%] ps-[15px] sm:ps-[18px] lg:ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[15px] sm:text-[16px] lg:text-[18px] rounded-[4px] focus:border-[#ff4141]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="h-[45px] sm:h-[48px] lg:h-[50px] w-[100%] ps-[15px] sm:ps-[18px] lg:ps-[20px] border-[1px] border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[15px] sm:text-[16px] lg:text-[18px] rounded-[4px] focus:border-[#ff4141]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-[100%] h-[50px] sm:h-[55px] lg:h-[60px] text-white bg-[#ff4141] mt-[25px] sm:mt-[28px] lg:mt-[30px] border-none text-[18px] sm:text-[20px] lg:text-[22px] font-[500] cursor-pointer rounded-[4px] hover:bg-[#e63939] transition-all"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-[18px] sm:mt-[20px] text-[#5c5c5c] text-[15px] sm:text-[16px] lg:text-[17px] font-[500]">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-[#ff4141] font-[600] cursor-pointer hover:underline">
              Register here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
