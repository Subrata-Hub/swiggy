/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { CART_IMG, getFormatedPrice } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addCartItems, addResInfo } from "../utils/cartSlice";

import { auth } from "../utils/firebase";
import { addIsCheckOutPage, addShowNavigation } from "../utils/configSlice";
import fetchUserCarts from "../actions/fetchUserCarts";
// import { collection, getDocs, query, where } from "firebase/firestore";

const PreviewCartViewForMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantInfo = useSelector((state) => state.cart.resInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartNumber = useSelector((state) => state.cart.totalCardItems);
  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));
  const showNavigation = useSelector((store) => store.config.showNavigation);

  const subTotal = cartItems
    ?.map((cart) => cart?.menuPrice * cart?.totalMenuItems)
    ?.reduce((acc, item) => acc + item, 0);

  const subTotalForUser =
    userCartItems &&
    userCartItems?.cartItems
      ?.map((item) => item?.menuPrice * item?.totalMenuItems)
      ?.reduce((acc, item) => acc + item, 0);

  const totalItems =
    userCartItems?.items
      ?.map((item) => item?.totalMenuItems)
      ?.reduce((acc, item) => acc + item, 0) || 0;

  useEffect(() => {
    const fetchCarts = async () => {
      const carts = await fetchUserCarts(auth?.currentUser?.uid);

      const cartResInfo = carts?.[0]?.resInfo; // Be careful here, carts might be empty

      carts?.forEach((item) => {
        // This effect now primarily focuses on populating Redux if it's empty or on initial load
        if (!cartItems?.length && item?.cartItems) {
          dispatch(
            addCartItems({
              ...item?.cartItems,
              ["cartId"]: item?.id,
              ["totalMenuItems"]: item?.totalMenuItems,
              ["isCommingFromDB"]: true,
              ["addonsList"]: item?.addonsList,
              ["selectedAddons"]: item?.selectedAddons,
            })
          );
        }
      });

      if (cartResInfo && Object.keys(restaurantInfo).length === 0) {
        dispatch(addResInfo(cartResInfo));
      }
    };

    if (
      (auth?.currentUser?.uid || window.innerWidth < 640) &&
      !showNavigation
    ) {
      fetchCarts();
    }
  }, [
    auth?.currentUser?.uid,
    dispatch,
    cartItems?.length,

    restaurantInfo,
    cartItems,
  ]); // Added dependencies

  const handleCheckPage = () => {
    navigate("/checkout");
    dispatch(addIsCheckOutPage(true));
    dispatch(addShowNavigation(false));
  };

  return (
    <div className="sm:hidden -ml-4 overflowy-y-auto fixed bottom-[63px] h-auto  bg-slate-800 w-full z-[10000000] border-t-2 border-b-2 border-slate-600">
      {restaurantInfo &&
        (cartItems?.length > 0 || userCartItems?.cartItems?.length > 0) && (
          <div className="flex justify-between items-center mx-4 my-2 gap-2">
            <div className="flex justify-between items-center gap-2">
              <div className="w-[45px] h-[45px]">
                <img
                  src={
                    CART_IMG +
                    (restaurantInfo?.resImg || userCartItems?.resInfo?.resImg)
                  }
                  className="w-[45px] h-[45px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-[14px] max-w-[180px]">
                <h2 className="text-[15px] font-semibold truncate">
                  {restaurantInfo?.restaurantName ||
                    userCartItems?.resInfo?.restaurantName}
                </h2>
                <Link
                  to={
                    restaurantInfo?.menuURL
                      ? restaurantInfo?.menuURL
                      : userCartItems?.resInfo?.menuURL
                  }
                >
                  <p className="">View Full Menu</p>
                </Link>
              </div>
            </div>

            <div
              className="px-5 py-1.5 bg-green-600 rounded-[10px]"
              onClick={handleCheckPage}
            >
              <span>{cartNumber ? cartNumber : totalItems} Item</span> |{" "}
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
