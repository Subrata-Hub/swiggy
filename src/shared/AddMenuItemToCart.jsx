/* eslint-disable react/prop-types */
import { IoAdd, IoRemove } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

import { auth } from "../utils/firebase";
import { addCartItems, addResInfo, removeCardItems } from "../utils/cartSlice";
import createCartAndLinkToUser from "../actions/createCartAndLinkToUser";
import { toast } from "react-toastify";
import { addResParams } from "../utils/searchSlice";
import updateCardItemAndFirestore from "../actions/updateCardItemAndFirestore";
import deleteMenutem from "../actions/deleteMenutem";

const AddMenuItemToCart = ({
  resInformation,
  resMenuItem,
  menuInfo,

  addonButtonRef,
  addResetRef,
  setShowResetCardPopup,
  showMenuCardPopup,
  setShowMenuCardPopup,
  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,

  menuItem,
  userMenuItem,
  counter,
  cartItems,
  userCartItems,
  isImage,
  topPicksData,
  setShowPopupBeforeUpdate,
  addUpdateRef,
  totalMenuItem,
}) => {
  const dispatch = useDispatch();
  const restaurantInfoFromCard = useSelector((state) => state.cart.resInfo);
  const resParamsObj = useSelector((store) => store?.search?.resParams);

  const handleShowMenuCardPopup = async () => {
    console.log(menuInfo);
    if (resMenuItem?.card?.info?.addons || resMenuItem?.info?.addons) {
      if (
        cartItems.length >= 1 &&
        restaurantInfoFromCard?.restaurantId !== resInformation?.restaurantId
      ) {
        setShowResetCardPopup(true);
      } else {
        setShowMenuCardPopup(!showMenuCardPopup);
        // counter = 0;
      }
    } else {
      if (
        restaurantInfoFromCard &&
        (cartItems.length >= 1 || userCartItems?.cartItems?.length >= 1) &&
        (restaurantInfoFromCard?.restaurantId ||
          userCartItems?.resInfo?.restaurantId) !== resInformation?.restaurantId
      ) {
        setShowResetCardPopup(true);
      } else {
        const newCounter = counter + 1;

        const cartItemInfo = {
          cartItems: menuInfo,
          resInfo: resInformation,
          totalMenuItems: newCounter,
          userId: auth?.currentUser?.uid,
        };

        console.log(cartItemInfo);

        const cartId = await createCartAndLinkToUser(
          auth?.currentUser?.uid,
          cartItemInfo
        );

        const updatedCardInfo = {
          ...menuInfo,
          totalMenuItems: newCounter,
          // cartId: tempCartId,
        };

        dispatch(addResInfo(resInformation));

        dispatch(addCartItems({ ...updatedCardInfo, cartId }));

        goToSearchResultsPage(resInformation?.restaurantId, menuInfo?.menuId);
      }
    }
  };

  const updatingCardItem = async (item, action, cartId) => {
    if (totalMenuItem?.length > 1 && action === "Remove") {
      toast(
        "This item has multiple customizations added. Remove the correct item from the cart."
      );
      return;
    }
    if (
      (resMenuItem?.card?.info?.addons || resMenuItem?.info?.addons) &&
      action === "Add"
    ) {
      setShowPopupBeforeUpdate(true);
    } else {
      const updatedCardInfo = {
        ...menuInfo,
        totalMenuItems: item, // Use the latest item count directly
        action: action,
        cartId,
      };

      dispatch(
        updateCardItemAndFirestore(
          { ...menuInfo, totalMenuItems: item },
          action,
          cartId
        )
      );

      if (item === 0) {
        dispatch(removeCardItems(updatedCardInfo));
        await deleteMenutem(cartId);
      }
    }
  };

  const goToSearchResultsPage = (resId, menuId) => {
    if (
      !resMenuItem?.info?.addons &&
      !showAddToCardSearchResultsData &&
      resId &&
      menuId
    ) {
      dispatch(
        addResParams({
          resId: resId,
          menuId: menuId,
        })
      );

      setShowAddToCardSearchResultsData(true);

      toast(`Add item to the card from ${resInformation.restaurantName}`);
    } else if (
      showAddToCardSearchResultsData ||
      (resParamsObj?.resId && resParamsObj?.menuId)
    ) {
      return;
    }
  };

  return (
    <div
      className={`absolute ${
        isImage ? "top-[110px] sm:top-[124px]" : "top-14"
      } left-4.5 sm:left-6`}
    >
      <div>
        {counter === 0 && (
          <div ref={addonButtonRef}>
            <button
              className="px-8 sm:px-10 py-2 bg-slate-900 text-emerald-500 shadow-md rounded-xl shadow-cyan-950"
              onClick={() => {
                handleShowMenuCardPopup();
              }}
              ref={addResetRef}
            >
              ADD
            </button>
          </div>
        )}

        {counter >= 1 && (
          <div className="w-[100px] sm:w-[120px] h-10 bg-slate-900 text-emerald-500 rounded-xl flex items-center justify-center">
            <div
              className="flex justify-center items-center gap-7"
              ref={addonButtonRef}
            >
              <div
                onClick={() =>
                  updatingCardItem(
                    counter - 1,
                    "Remove",
                    menuItem?.cartId || userMenuItem?.cartId
                  )
                }
              >
                {" "}
                <IoRemove />
              </div>

              <p className=""> {counter}</p>

              <div
                ref={addUpdateRef}
                className=""
                onClick={() =>
                  updatingCardItem(
                    counter + 1,
                    "Add",
                    menuItem?.cartId || userMenuItem?.cartId
                  )
                }
              >
                {" "}
                <IoAdd />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-[14px] flex justify-center items-center">
        {(resMenuItem?.card?.info?.addons || resMenuItem?.info?.addons) &&
          !topPicksData && <p className="">Customisable</p>}
      </div>
    </div>
  );
};

export default AddMenuItemToCart;
