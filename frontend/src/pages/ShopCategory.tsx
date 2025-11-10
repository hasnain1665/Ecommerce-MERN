import { MdKeyboardArrowDown } from "react-icons/md";
import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/productSlice";

interface ShopCategoryProps {
  itemCategory: string;
  banner: string;
}

enum SortOptions {
  NEWEST = "Newest",
  LOWTOHIGH = "Price: Low to High",
  HIGHTOLOW = "Price: High to Low",
  NAME_AZ = "Name: A-Z",
  NAME_ZA = "Name: Z-A",
}

const ShopCategory: React.FC<ShopCategoryProps> = ({
  itemCategory,
  banner,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, totalPages, totalProducts } = useSelector(
    (state: RootState) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState(SortOptions.NEWEST);

  const limit = "4";

  useEffect(() => {
    setCurrentPage(1);
  }, [itemCategory]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit,
        pageNumber: String(currentPage),
        category: itemCategory,
      })
    );
  }, [dispatch, limit, currentPage, itemCategory]);

  return (
    <div>
      <img
        src={banner}
        alt=""
        className="block mx-auto my-[20px] sm:my-[30px] w-full sm:w-[90%] lg:w-[86%] px-4 sm:px-0"
      />
      <div className="flex flex-col sm:flex-row my-[0px] mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 justify-between items-start sm:items-center gap-4 sm:gap-0 w-full lg:w-[86%]">
        <p>
          <span className="font-[600]">
            Showing {currentPage * Number(limit) - Number(limit) + 1}-
            {currentPage * Number(limit) > totalProducts
              ? totalProducts
              : currentPage * Number(limit)}
          </span>{" "}
          out of {totalProducts} products
        </p>

        <div
          className="relative py-[10px] px-[20px] rounded-[40px] border-[1px] border-solid border-[#888] flex items-center gap-2 cursor-pointer hover:bg-gray-50"
          onClick={() => setSortOpen(!sortOpen)}
        >
          <p>Sort By:</p>
          <span className="font-[600]">{sortOption}</span>{" "}
          <MdKeyboardArrowDown size={20} />
          {sortOpen && (
            <div className="absolute top-[45px] right-0 bg-white border rounded-none shadow-lg z-10">
              {[
                SortOptions.NEWEST,
                SortOptions.HIGHTOLOW,
                SortOptions.LOWTOHIGH,
                SortOptions.NAME_AZ,
                SortOptions.NAME_ZA,
              ].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSortOption(option);
                    setSortOpen(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-100 ${
                    sortOption === option ? "bg-gray-200" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 my-[20px] mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:w-[86%]">
        {[...products]
          .filter((item) => item.category.name === itemCategory)
          .sort((a, b) => {
            switch (sortOption) {
              case SortOptions.LOWTOHIGH:
                return a.price - b.price;
              case SortOptions.HIGHTOLOW:
                return b.price - a.price;
              case SortOptions.NAME_AZ:
                return a.name.localeCompare(b.name);
              case SortOptions.NAME_ZA:
                return b.name.localeCompare(a.name);
              default:
                return 0;
            }
          })
          .map((product, index) => {
            return (
              <Item
                key={index}
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            );
          })}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-[40px] sm:mt-[70px] mb-[30px] sm:mb-[50px] px-4">
        <button
          disabled={currentPage === 1}
          className={`py-[12px] px-[24px] rounded-[40px] border border-solid border-[#888] font-[500] ${
            currentPage === 1
              ? " text-gray-500 cursor-not-allowed"
              : "hover:bg-red-300 cursor-pointer"
          }`}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          className={`py-[12px] px-[24px] rounded-[40px] border border-solid border-[#888] font-[500]
            ${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "hover:bg-red-300 cursor-pointer"
            }`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopCategory;
