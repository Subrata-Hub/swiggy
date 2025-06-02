/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { reSetStore } from "../utils/cartSlice";

import { auth } from "../utils/firebase";
import createCartAndLinkToUser from "../actions/createCartAndLinkToUser";
import deleteAllUserCarts from "../actions/deleteAllUserCarts";
import { addResParams } from "../utils/searchSlice";

const PopupResetCard = ({
  setShowResetCardPopup,
  resInformation,
  menuInfo,
  counter,

  setShowPopupBeforeReset,
  searchDishesData,
  setShowAddToCardSearchResultsData,
}) => {
  const dispatch = useDispatch();

  const handleResetCart = async () => {
    if (searchDishesData?.info?.addons) {
      setShowPopupBeforeReset(true);

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

      const cartItemInfo = {
        cartItems: preservedMenuInfo,
        resInfo: preservedResInfo,
        totalMenuItems: newCounter,
        userId: auth.currentUser.uid,
      };

      console.log(cartItemInfo);

      await createCartAndLinkToUser(auth?.currentUser?.uid, cartItemInfo);
      setShowResetCardPopup(false);

      dispatch(
        addResParams({
          resId: preservedResInfo?.restaurantId,
          menuId: preservedMenuInfo?.menuId,
        })
      );
      setShowAddToCardSearchResultsData(true);
    }
  };

  return (
    <div className="w-full sm:w-[520px] h-[220px] p-[20px] sm:p-[30px] bg-slate-800 fixed z-[119996552255255] bottom-60 sm:bottom-36 md:bottom-15 right-[0%] sm:right-[10%] md:right-[18%] lg:right-[25%] xl:right-[30%] 2xl:right-[35%] rounded-3xl">
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
