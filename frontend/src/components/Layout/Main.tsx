import AppNavBar from "../AppNavBar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <AppNavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
