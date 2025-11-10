import Item from "./Item";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const NewCollections = () => {
  const { allProducts } = useSelector((state: RootState) => state.products);
  const newCollections = allProducts.slice(0, 8);

  return (
    <div
      className="flex flex-col items-center gap-[10px] mb-[60px] sm:mb-[80px] lg:mb-[100px] px-4"
      id="new-collections"
    >
      <h1 className="text-[#171717] text-[22px] sm:text-[26px] lg:text-[30px] font-[600]">
        NEW COLLECTIONS
      </h1>
      <hr
        className="w-[150px] sm:w-[180px] lg:w-[200px] h-[5px] sm:h-[6px] border rounded-[10px] 
      bg-[#252525]"
      />
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-[30px] sm:mt-[40px] lg:mt-[50px] 
      gap-4 sm:gap-6 lg:gap-[30px] px-4 sm:px-6 lg:px-10  w-full max-w-[1400px]"
      >
        {newCollections.map((product, index) => {
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
    </div>
  );
};

export default NewCollections;
