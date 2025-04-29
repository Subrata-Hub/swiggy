/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { reSetStore } from "../utils/cartSlice";
// import { addResParams } from "../utils/searchSlice";

import { auth } from "../utils/firebase";
import createCartAndLinkToUser from "../actions/createCartAndLinkToUser";
import deleteAllUserCarts from "../actions/deleteAllUserCarts";

const PopupResetCard = ({
  setShowResetCardPopup,
  resInformation,
  menuInfo,
  counter,

  setShowPopupBeforeReset,
  searchDishesData,
  // setShowAddToCardSearchResultsData,
}) => {
  const dispatch = useDispatch();

  const handleResetCart = async () => {
    // setShowAddToCardSearchResultsData();
    if (searchDishesData?.info?.addons) {
      setShowPopupBeforeReset(true);

      // dispatch(reSetStore());
      // counter = 0;

      setShowResetCardPopup(false);
    } else {
      const userId = auth?.currentUser?.uid;
      if (!userId) {
        console.log("User not authenticated.");
        return;
      }

      // Save previous cart info
      const preservedMenuInfo = { ...menuInfo };
      const preservedResInfo = { ...resInformation };

      await deleteAllUserCarts(userId);

      dispatch(reSetStore());

      const newCounter = counter + 1;
      // setCounter(newCounter);

      const cartItemInfo = {
        cartItems: preservedMenuInfo,
        resInfo: preservedResInfo,
        totalMenuItems: newCounter,
        userId: auth.currentUser.uid,
      };

      console.log(cartItemInfo);

      // const updatedCardInfo = {
      //   ...preservedMenuInfo,
      //   totalMenuItems: newCounter,
      //   userId: auth.currentUser.uid,
      // };

      await createCartAndLinkToUser(auth?.currentUser?.uid, cartItemInfo);
      // dispatch(addResInfo(preservedResInfo));
      // dispatch(addCartItems({ ...updatedCardInfo, cartId }));

      // const cartData = {
      //   cartResInfo: preservedResInfo,
      //   items: [preservedMenuInfo],
      //   // totalItems,
      //   // subTotal,
      // };

      // localStorage.setItem("cart_items", JSON.stringify(cartData));

      setShowResetCardPopup(false);
    }
  };
  return (
    <div className="w-[520px] h-[220px] p-[30px] bg-slate-800 fixed z-[11999] bottom-15 right-[30%] rounded-3xl">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-bold text-[22px]">Items already in cart</h2>
        </div>
        <p>
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className="flex justify-between items-center mt-2">
          <button
            className="w-[220px] h-[50px] bg-slate-600"
            onClick={() => setShowResetCardPopup(false)}
          >
            NO
          </button>
          <button
            className="w-[220px] h-[50px] bg-green-500"
            onClick={() => {
              // setShowAddToCardSearchResultsData(false);
              handleResetCart();
            }}
          >
            YES START AFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupResetCard;
