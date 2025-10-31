import React from "react";

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
  return (
    <div>
      <div>
        <div>
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
        </div>
        <div>
          <img src={product?.image} alt="" />
        </div>
      </div>
      <div>
        <h1>{product?.name}</h1>
        <div></div>
      </div>
    </div>
  );
};

export default ProductDisplay;
