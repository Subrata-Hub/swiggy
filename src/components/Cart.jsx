import { HiShoppingCart } from "react-icons/hi";
const Cart = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <HiShoppingCart className="text-2xl" /> <span>Cart</span>
    </div>
  );
};

export default Cart;
