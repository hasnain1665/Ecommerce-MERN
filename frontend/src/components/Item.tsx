import { Link } from "react-router-dom";

interface ItemProps {
  id: number;
  image: string;
  name: string;
  price: number;
}

const Item: React.FC<ItemProps> = ({ id, image, name, price }) => {
  return (
    <div className="w-[230px] ">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt=""
          className="max-h-full max-w-full object-contain transform hover:scale-[1.05] transition-transform duration-[0.6s]"
        />
      </Link>
      <p className="my-[6px] h-[48px] line-clamp-2">{name}</p>
      <hr className="w-full h-[1px] bg-[#e5e7eb] border-0 my-[8px]" />
      <div className="flex justify-between">
        <div className="text-[#374151] text-[18px] font-[600]">${price}</div>
        <button className="bg-[#252525] text-white px-[16px] py-[8px] rounded-[4px] text-[14px] font-[500] hover:bg-[#171717] hover:scale-[1.05] active:scale-[0.98] transition-all duration-[0.3s]">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
