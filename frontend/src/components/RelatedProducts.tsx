import p1_img from "../assets/product_12.png";
import p2_img from "../assets/product_35.png";
import p3_img from "../assets/product_14.png";
import p4_img from "../assets/product_8.png";
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
];

const RelatedProducts = () => {
  return (
    <div className="flex flex-col items-center gap-[10px] mb-[60px] sm:mb-[80px] lg:mb-[100px] px-4">
      <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-[600] text-[#171717]">
        YOU MAY ALSO LIKE
      </h1>
      <hr className="w-[150px] sm:w-[180px] lg:w-[200px] h-[5px] sm:h-[6px] border rounded-[10px] bg-[#252525]" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-[30px] sm:mt-[40px] lg:mt-[50px] gap-4 sm:gap-6 lg:gap-[30px] px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
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

export default RelatedProducts;
