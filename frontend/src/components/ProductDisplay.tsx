import React, { useState } from "react";
import { Product } from "../redux/productSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addItem } from "../redux/cartSlice";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface ProductDisplayProps {
  product?: Product;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL"];

  const incrementQuantity = () => {
    if (!product?.quantity) return;
    if (quantity >= product?.quantity) return;
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddItem = async (id: string, quantity: number) => {
    await dispatch(addItem({ productId: id, cartQuantity: quantity }));
    toast.success("Item added to cart!");
  };

  return (
    <div
      className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 mx-4 sm:mx-8 lg:mx-[140px] my-[20px] 
    sm:my-[30px] lg:my-[20px]"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="hidden md:flex flex-col gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`${baseURL}${product?.image}`}
              alt={product?.name}
              className="max-w-[80px] sm:max-w-[90px] lg:max-w-[100px] max-h-[75px] sm:max-h-[85px] 
              lg:max-h-[95px] object-contain cursor-pointer hover:border border-gray-300 rounded"
            />
          ))}
        </div>
        <div className="flex flex-col">
          <img
            src={`${baseURL}${product?.image}`}
            alt={product?.name}
            className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] h-[350px] sm:h-[380px] md:h-[420px] 
            lg:h-[430px] object-cover rounded"
          />
        </div>
      </div>
      <div className="flex flex-col my-[0px] lg:ms-[40px]">
        <h1 className="text-[#3d3d3d] text-[22px] sm:text-[25px] lg:text-[28px] font-[600]">
          {product?.name}
        </h1>

        <div className="flex items-center gap-3 my-[10px]">
          <div className="text-[#ff4141] text-[20px] sm:text-[22px] lg:text-[24px] font-[700]">
            ${product?.price}
          </div>
        </div>

        <div
          className="text-gray-600 mb-[15px] sm:mb-[18px] lg:mb-[20px] text-[14px] sm:text-[15px] 
        lg:text-[16px]"
        >
          {product?.name}
        </div>

        <div className="mb-[15px] sm:mb-[18px] lg:mb-[20px]">
          <p className="font-[600] text-black mb-[8px] sm:mb-[10px] text-[15px] sm:text-[16px]">
            Select Size
          </p>
          <div className="flex gap-2 sm:gap-3">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-[45px] h-[45px] sm:w-[48px] sm:h-[48px] lg:w-[50px] lg:h-[50px] flex 
                  items-center justify-center border-2 rounded cursor-pointer transition-all text-[14px] 
                  sm:text-[15px] lg:text-[16px] ${
                    selectedSize === size
                      ? "border-[#ff4141] bg-[#ff4141] text-white"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-[15px] sm:mb-[18px] lg:mb-[20px]">
          <p className="font-[600] text-black mb-[8px] sm:mb-[10px] text-[15px] sm:text-[16px]">
            Quantity
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={decrementQuantity}
              className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] border-2 border-gray-300 rounded flex 
              items-center justify-center text-[18px] sm:text-[20px] cursor-pointer hover:border-gray-400"
            >
              -
            </button>
            <div
              className="w-[55px] h-[38px] sm:w-[60px] sm:h-[40px] border-2 border-gray-300 rounded 
            flex items-center justify-center text-[16px] sm:text-[18px] font-[600]"
            >
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] border-2 border-gray-300 rounded 
              flex items-center justify-center text-[18px] sm:text-[20px] cursor-pointer hover:border-gray-400"
            >
              +
            </button>
          </div>
        </div>

        <button
          className="py-[13px] sm:py-[14px] lg:py-[15px] px-[35px] sm:px-[38px] lg:px-[40px] w-full 
        sm:w-[190px] lg:w-[200px] text-white text-[15px] sm:text-[16px] font-[600] bg-[#ff4141] rounded
        border-none outline-none cursor-pointer hover:bg-[#e63939] transition-all"
          onClick={() => {
            console.log("Add Item:", !product?._id);
            if (!product?._id) return;
            handleAddItem(product._id, quantity);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
