import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
const baseURL = import.meta.env.VITE_API_BASE_URL;
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllItems, removeItem, updateItem } from "../redux/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CartItem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [promoCode, setPromoCode] = useState("");

  const incrementQuantity = (id: string) => {
    const item = cartItems.find((i) => i.product._id === id);
    console.log(item);
    if (!item) return;
    console.log(item.cartQuantity);
    console.log(item.product.quantity);
    if (item.cartQuantity >= item.product.quantity) return;

    dispatch(
      updateItem({ productId: id, cartQuantity: item.cartQuantity + 1 })
    );
  };

  const decrementQuantity = (id: string) => {
    const item = cartItems.find((i) => i.product._id === id);
    if (!item || item.cartQuantity <= 1) return;

    dispatch(
      updateItem({ productId: id, cartQuantity: item.cartQuantity - 1 })
    );
  };

  const handleRemoveItem = async (id: string) => {
    await dispatch(removeItem({ productId: id }));
    toast.success("Item removed from cart!");
  };

  const subtotal = cartItems.reduce((sum, cartItem) => {
    return sum + cartItem.product?.price * cartItem.cartQuantity;
  }, 0);

  const shippingFee = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingFee;

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-[24px] sm:text-[28px] font-[600] text-[#454545] mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-[16px] text-gray-600 mb-6">
          Add some products to get started!
        </p>
        <Link to="/">
          <button
            className="py-[12px] px-[30px] bg-[#ff4141] text-white text-[16px] font-[500] 
          rounded cursor-pointer hover:bg-[#e63939] transition-all"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="my-[40px] sm:my-[60px] lg:my-[100px] mx-4 sm:mx-8 lg:mx-[170px]">
      <div
        className="hidden lg:grid grid-cols-[1fr_2.5fr_1fr_1.5fr_1fr_0.8fr] items-center gap-4 
      py-[20px] text-[#454545] text-[16px] font-[600]"
      >
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="hidden lg:block h-[3px] bg-[#e2e2e2] border-none" />

      {cartItems.map((item) => (
        <div key={item.product._id}>
          <div
            className="hidden lg:grid grid-cols-[1fr_2.5fr_1fr_1.5fr_1fr_0.8fr] items-center gap-4 
          py-[25px] text-[#454545] text-[15px] font-[500]"
          >
            <img
              src={`${baseURL}${item.product.image}`}
              alt={item.product.name}
              className="w-[90px] h-[90px] object-cover rounded"
            />
            <p className="line-clamp-2">{item.product.name}</p>
            <p className="font-[600]">${item.product.price}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementQuantity(item.product._id)}
                className="w-[35px] h-[35px] border-2 border-gray-300 rounded flex items-center 
                justify-center text-[18px] cursor-pointer hover:border-[#ff4141] hover:text-[#ff4141] 
                transition-all"
              >
                -
              </button>
              <div
                className="w-[50px] h-[35px] border-2 border-gray-300 rounded flex items-center 
              justify-center text-[16px] font-[600]"
              >
                {item.cartQuantity}
              </div>
              <button
                onClick={() => incrementQuantity(item.product._id)}
                className="w-[35px] h-[35px] border-2 border-gray-300 rounded flex items-center 
                justify-center text-[18px] cursor-pointer hover:border-[#ff4141] hover:text-[#ff4141] 
                transition-all"
              >
                +
              </button>
            </div>
            <p className="font-[600]">
              ${(item.product.price * item.cartQuantity).toFixed(2)}
            </p>
            <FiTrash2
              onClick={() => handleRemoveItem(item.product._id)}
              className="w-[20px] h-[20px] text-gray-500 cursor-pointer hover:text-red-500 
              transition-all mx-auto"
            />
          </div>
          <div className="lg:hidden flex gap-4 py-4 border-b border-gray-200 relative">
            <img
              src={`${baseURL}${item.product.image}`}
              alt={item.product.name}
              className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[14px] sm:text-[15px] font-[500] text-[#454545] line-clamp-2 pr-8">
                  {item.product.name}
                </p>
                <p className="text-[16px] sm:text-[18px] font-[600] text-[#ff4141] mt-2">
                  ${item.product.price}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(item.product._id)}
                    className="w-[32px] h-[32px] border-2 border-gray-300 rounded flex items-center 
                    justify-center text-[16px] cursor-pointer hover:border-[#ff4141] hover:text-[#ff4141] 
                    transition-all"
                  >
                    -
                  </button>
                  <div
                    className="w-[45px] h-[32px] border-2 border-gray-300 rounded flex items-center 
                  justify-center text-[14px] font-[600]"
                  >
                    {item.cartQuantity}
                  </div>
                  <button
                    onClick={() => incrementQuantity(item.product._id)}
                    className="w-[32px] h-[32px] border-2 border-gray-300 rounded flex items-center 
                    justify-center text-[16px] cursor-pointer hover:border-[#ff4141] hover:text-[#ff4141] 
                    transition-all"
                  >
                    +
                  </button>
                </div>
                <p className="text-[16px] sm:text-[17px] font-[600] text-[#454545]">
                  ${(item.product.price * item.cartQuantity).toFixed(2)}
                </p>
              </div>
            </div>
            <FiTrash2
              onClick={() => handleRemoveItem(item.product._id)}
              className="absolute top-4 right-0 w-[18px] h-[18px] text-gray-500 cursor-pointer 
              hover:text-red-500 transition-all"
            />
          </div>

          <hr className="hidden lg:block" />
        </div>
      ))}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 my-[40px] sm:my-[60px] lg:my-[80px]">
        <div className="flex-1 lg:me-[80px]">
          <div className="border-2 border-gray-200 rounded-lg p-6 sm:p-8">
            <h1 className="text-[20px] sm:text-[22px] font-[600] text-[#454545] mb-6">
              Cart Total
            </h1>
            <div>
              <div className="flex justify-between py-[12px] sm:py-[15px] text-[15px] sm:text-[16px]">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-[600] text-[#454545]">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <hr />
              <div className="flex justify-between py-[12px] sm:py-[15px] text-[15px] sm:text-[16px]">
                <p className="text-gray-600">Shipping Fee</p>
                <p className="font-[600] text-[#454545]">
                  {shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}
                </p>
              </div>
              <hr />
              <div className="flex justify-between py-[12px] sm:py-[15px] text-[17px] sm:text-[18px]">
                <h3 className="font-[600] text-[#454545]">Total</h3>
                <h3 className="font-[700] text-[#ff4141]">
                  ${total.toFixed(2)}
                </h3>
              </div>
            </div>
            <button
              className="w-full sm:w-auto sm:min-w-[240px] h-[50px] sm:h-[55px] mt-6 outline-none 
            border-none bg-[#ff4141] text-white text-[15px] sm:text-[16px] font-[600] cursor-pointer
            rounded hover:bg-[#e63939] transition-all"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="border-2 border-gray-200 rounded-lg p-6 sm:p-8">
            <p className="text-[16px] sm:text-[17px] font-[500] text-[#555] mb-4">
              If you have a promo code, Enter it here
            </p>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className=" flex-1 border-2 border-gray-300 rounded sm:rounded-r-none px-5 h-[50px] 
                sm:h-[55px] outline-none text-[15px] sm:text-[16px] focus:border-[#ff4141] transition-all"
              />
              <button
                className="w-full sm:w-[130px] h-[50px] sm:h-[55px] text-[15px] sm:text-[16px] 
              font-[500] bg-black text-white cursor-pointer rounded sm:rounded-l-none hover:bg-[#252525]
              transition-all"
              >
                Submit
              </button>
            </div>
            <p className="text-[13px] sm:text-[14px] text-gray-500 mt-3">
              Free shipping on orders over $100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
