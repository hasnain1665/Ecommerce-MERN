import React, { useState } from "react";

interface ProductProps {
  product?: {
    id: number;
    name: string;
    category: string;
    image: string;
    new_price: number;
    old_price: number;
  };
}

const ProductDisplay: React.FC<ProductProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL"];

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex gap-10 mx-[140px] my-[20px]">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={product?.image}
              alt={product?.name}
              className="max-w-[100px] max-h-[95px] object-contain cursor-pointer hover:border"
            />
          ))}
        </div>
        <div className="flex flex-col">
          <img
            src={product?.image}
            alt={product?.name}
            className="max-w-[500px] max-h-[600px] object-contain rounded"
          />
        </div>
      </div>
      <div className="flex flex-col my-[0px] ms-[40px]">
        <h1 className="text-[#3d3d3d] text-[28px] font-[600]">
          {product?.name}
        </h1>

        <div className="flex items-center gap-3 my-[10px]">
          <div className="text-[#ff4141] text-[24px] font-[700]">
            ${product?.new_price}
          </div>
        </div>

        <div className="text-gray-600 mb-[20px]">{product?.name}</div>

        <div className="mb-[20px]">
          <p className="font-[600] text-black mb-[10px]">Select Size</p>
          <div className="flex gap-3">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-[50px] h-[50px] flex items-center justify-center border-2 rounded cursor-pointer transition-all ${
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

        <div className="mb-[20px]">
          <p className="font-[600] text-black mb-[10px]">Quantity</p>
          <div className="flex items-center gap-3">
            <button
              onClick={decrementQuantity}
              className="w-[40px] h-[40px] border-2 border-gray-300 rounded flex items-center justify-center text-[20px] cursor-pointer hover:border-gray-400"
            >
              -
            </button>
            <div className="w-[60px] h-[40px] border-2 border-gray-300 rounded flex items-center justify-center text-[18px] font-[600]">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              className="w-[40px] h-[40px] border-2 border-gray-300 rounded flex items-center justify-center text-[20px] cursor-pointer hover:border-gray-400"
            >
              +
            </button>
          </div>
        </div>

        <button className="py-[15px] px-[40px] w-[200px] text-white text-[16px] font-[600] bg-[#ff4141] rounded border-none outline-none cursor-pointer hover:bg-[#e63939] transition-all">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
