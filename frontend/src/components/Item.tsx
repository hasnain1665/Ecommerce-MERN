interface ItemProps {
  image: string;
  name: string;
  price: number;
}

const Item: React.FC<ItemProps> = ({ image, name, price }) => {
  return (
    <div className="w-[230px] tranform hover:scale-[1.05] transition-transform duration-[0.6s]">
      <img
        src={image}
        alt=""
        className="max-h-full max-w-full object-contain"
      />
      <p className="my-[6px]">{name}</p>
      <div className="text-[#374151] text-[18px] font-[600]">${price}</div>
    </div>
  );
};

export default Item;
