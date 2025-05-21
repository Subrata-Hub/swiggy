import { useSelector } from "react-redux";
import { CART_IMG, getFormatedPrice } from "../utils/constant";
import { Link } from "react-router-dom";

const PreviewCartViewForMobile = () => {
  const restaurantInfo = useSelector((state) => state.cart.resInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));

  const subTotal = cartItems
    ?.map((cart) => cart?.menuPrice * cart?.totalMenuItems)
    ?.reduce((acc, item) => acc + item, 0);

  const subTotalForUser =
    userCartItems &&
    userCartItems?.cartItems
      ?.map((item) => item?.menuPrice * item?.totalMenuItems)
      ?.reduce((acc, item) => acc + item, 0);

  console.log(restaurantInfo);
  return (
    <div className="sm:hidden -ml-4 overflowy-y-auto fixed bottom-[63px] h-auto  bg-slate-800 w-full z-[10000000] border-t-2 border-b-2 border-slate-600">
      {restaurantInfo &&
        (cartItems?.length > 0 || userCartItems?.items?.length > 0) && (
          <div className="flex justify-between items-center mx-4 my-2 gap-2">
            <div className="flex justify-between items-center gap-2">
              <div className="w-[45px] h-[45px]">
                <img
                  src={
                    CART_IMG +
                    (restaurantInfo?.resImg ||
                      userCartItems?.cartResInfo?.resImg)
                  }
                  className="w-[45px] h-[45px] object-cover"
                />
              </div>
              <div className="text-[14px] max-w-[180px]">
                <h2 className="text-[15px] font-semibold truncate">
                  {restaurantInfo?.restaurantName ||
                    userCartItems?.cartResInfo?.restaurantName}
                </h2>
                <Link
                  to={
                    restaurantInfo?.menuURL
                      ? restaurantInfo?.menuURL
                      : userCartItems?.cartResInfo?.menuURL
                  }
                >
                  <p className="">View Full Menu</p>
                </Link>
              </div>
            </div>

            <div className="px-5 py-1.5 bg-green-600 rounded-[10px]">
              <span>{cartItems?.length} Item</span> |{" "}
              <span>
                ₹{getFormatedPrice(subTotal ? subTotal : subTotalForUser)}
              </span>
              <h2 className="font-semibold">Checkout</h2>
            </div>
          </div>
        )}
    </div>
  );
};

export default PreviewCartViewForMobile;
