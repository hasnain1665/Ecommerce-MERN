import p1_img from "../assets/product_12.png";
import p2_img from "../assets/product_35.png";
import p3_img from "../assets/product_14.png";
import p4_img from "../assets/product_8.png";
import p5_img from "../assets/product_15.png";
import p6_img from "../assets/product_2.png";
import p7_img from "../assets/product_17.png";
import p8_img from "../assets/product_28.png";
import Item from "./Item";

const new_collections = [
  {
    id: 12,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p1_img,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 35,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: p2_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 14,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: p3_img,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 8,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p4_img,
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    id: 15,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: p5_img,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p6_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 17,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: p7_img,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 28,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: p8_img,
    new_price: 100.0,
    old_price: 150.0,
  },
];

const NewCollections = () => {
  return (
    <div className="flex flex-col items-center gap-[10px] mb-[60px] sm:mb-[80px] lg:mb-[100px] px-4">
      <h1 className="text-[#171717] text-[22px] sm:text-[26px] lg:text-[30px] font-[600]">
        NEW COLLECTIONS
      </h1>
      <hr className="w-[150px] sm:w-[180px] lg:w-[200px] h-[5px] sm:h-[6px] border rounded-[10px] bg-[#252525]" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-[30px] sm:mt-[40px] lg:mt-[50px] gap-4 sm:gap-6 lg:gap-[30px] px-4 sm:px-6 lg:px-10  w-full max-w-[1400px]">
        {new_collections.map((product, index) => {
          return (
            <Item
              key={index}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
