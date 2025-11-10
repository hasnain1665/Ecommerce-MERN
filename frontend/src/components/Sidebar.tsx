import { Link } from "react-router-dom";
import { FiPlusCircle, FiList } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="flex flex-col pt-[20px] sm:pt-[30px] gap-[15px] sm:gap-[20px] w-full sm:max-w-[200px] lg:max-w-[250px] min-h-screen bg-gradient-to-b from-[#fef5ff] to-[#f0fff4] border-r border-gray-200">
      <Link to={"/admin/addproduct"} className="no-underline">
        <div className="flex items-center mx-[15px] sm:mx-[20px] p-[10px] sm:p-[12px] rounded-[6px] bg-white hover:bg-[#ff4141] gap-[12px] sm:gap-[15px] cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md border border-gray-100">
          <FiPlusCircle className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-[#ff4141] group-hover:text-white transition-colors" />
          <p className="text-[14px] sm:text-[15px] font-[500] text-[#454545] group-hover:text-white transition-colors">
            Add Product
          </p>
        </div>
      </Link>
      <Link to={"/admin/addcategory"} className="no-underline">
        <div className="flex items-center mx-[15px] sm:mx-[20px] p-[10px] sm:p-[12px] rounded-[6px] bg-white hover:bg-[#ff4141] gap-[12px] sm:gap-[15px] cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md border border-gray-100">
          <FiPlusCircle className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-[#ff4141] group-hover:text-white transition-colors" />
          <p className="text-[14px] sm:text-[15px] font-[500] text-[#454545] group-hover:text-white transition-colors">
            Add Category
          </p>
        </div>
      </Link>
      <Link to={"/admin/listproducts"} className="no-underline">
        <div className="flex items-center mx-[15px] sm:mx-[20px] p-[10px] sm:p-[12px] rounded-[6px] bg-white hover:bg-[#ff4141] gap-[12px] sm:gap-[15px] cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md border border-gray-100">
          <FiList className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-[#ff4141] group-hover:text-white transition-colors" />
          <p className="text-[14px] sm:text-[15px] font-[500] text-[#454545] group-hover:text-white transition-colors">
            Product List
          </p>
        </div>
      </Link>
      <Link to={"/admin/listcategories"} className="no-underline">
        <div className="flex items-center mx-[15px] sm:mx-[20px] p-[10px] sm:p-[12px] rounded-[6px] bg-white hover:bg-[#ff4141] gap-[12px] sm:gap-[15px] cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md border border-gray-100">
          <FiList className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-[#ff4141] group-hover:text-white transition-colors" />
          <p className="text-[14px] sm:text-[15px] font-[500] text-[#454545] group-hover:text-white transition-colors">
            Categories List
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
