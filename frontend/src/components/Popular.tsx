import p1_img from "../assets/product_1.png";
import p2_img from "../assets/product_2.png";
import p3_img from "../assets/product_3.png";
import p4_img from "../assets/product_4.png";
import Item from "./Item";

const data_product = [
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p1_img,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p2_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p3_img,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p4_img,
    new_price: 100.0,
    old_price: 150.0,
  },
];

const Popular = () => {
  return (
    <div className="flex flex-col items-center gap-[10px] mb-[100px] max-w-full">
      <h1 className="text-[#171717] text-[30px] font-[600]">
        POPULAR IN WOMEN
      </h1>
      <hr className="w-[200px] h-[6px] border rounded-[10px] bg-[#252525]" />
      <div className="mt-[50px] flex gap-[30px]">
        {data_product.map((product, index) => {
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

export default Popular;
