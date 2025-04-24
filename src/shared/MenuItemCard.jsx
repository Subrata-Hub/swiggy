/* eslint-disable react/prop-types */

import { IMG_MENU } from "../utils/constant";
import { useRef, useState } from "react";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";

import useOutSideClick from "../hooks/useOutsideClick";
import PopupSearchDishesCard from "./PopupSearchDishesCard";
import PopupCardMenu from "./PopupCardMenu";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItems,
  addResInfo,
  removeCardItems,
  updateCardItems,
} from "../utils/cartSlice";
import PopupResetCard from "./PopupResetCard";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import createCartAndLinkToUser from "../actions/createCartAndLinkToUser";

const MenuItemCard = ({ resMenuItem, resInformation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenuCardPopup, setShowMenuCardPopup] = useState(false);
  const [showResetCardPopup, setShowResetCardPopup] = useState(false);
  const [disableOutsideClick, setDisableOutsideClick] = useState(false);
  const [showPopupBeforeReset, setShowPopupBeforeReset] = useState(false);
  const [showMore, setShowMore] = useState(false);
  // const [counter, setCounter] = useState(0);

  const menuDishesCardRef = useRef(null);
  const menuItemCardRef = useRef(null);
  const addonButtonRef = useRef(null);
  const detailMenuButtonRef = useRef(null);
  const addResetRef = useRef(null);
  const resetPopupCardRef = useRef(null);
  const disPatch = useDispatch();

  const restaurantInfoFromCard = useSelector((state) => state.cart.resInfo);

  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));
  // console.log(userCartItems);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const menuItem = cartItems.find(
    (item) => item.menuId === resMenuItem?.card?.info?.id
  );

  const userMenuItem = userCartItems?.items?.[0]?.find(
    (item) => item.menuId === resMenuItem?.card?.info?.id
  );

  // console.log(userMenuItem);
  let counter = menuItem?.totalMenuItems || userMenuItem?.totalMenuItems || 0;

  useOutSideClick(
    menuDishesCardRef,
    () => setShowPopup(false),
    detailMenuButtonRef
  );
  useOutSideClick(
    menuItemCardRef,
    () => {
      if (!disableOutsideClick) {
        setShowMenuCardPopup(false);
      }
    },
    addonButtonRef
  );

  useOutSideClick(
    resetPopupCardRef,
    () => {
      if (!disableOutsideClick) {
        setShowResetCardPopup(false);
        // setShowResetCardPopup(false);
      }
    },
    addResetRef
  );

  const handleContinueClick = () => {
    setDisableOutsideClick(true);
    setTimeout(() => setDisableOutsideClick(false), 100);
  };

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const menuInfo = {
    menuId: resMenuItem?.card?.info?.id,
    resId: resInformation?.restaurantId,
    menuName: resMenuItem?.card?.info?.name,
    vegClassifier: resMenuItem?.card?.info?.itemAttribute?.vegClassifier,
    menuPrice: resMenuItem?.card?.info?.price
      ? resMenuItem?.card?.info?.price / 100
      : resMenuItem?.card?.info?.defaultPrice / 100,

    // totalMenuItems: counter + 1,
  };

  const updateCardItemAndFirestore =
    (item, action, cartId) => async (dispatch) => {
      dispatch(updateCardItems({ ...item, action, cartId })); // Dispatch the synchronous Redux update
      console.log(item);

      if (cartId) {
        const cartRef = doc(db, "cart", cartId);
        try {
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            await updateDoc(cartRef, {
              // cartItems: updatedCartItems,
              totalMenuItems: item.totalMenuItems, // Use the updated item count
            });
          }
        } catch (error) {
          console.error("Error updating cart in Firestore:", error);
          // Handle error appropriately (e.g., dispatch an error action)
        }
      } else {
        console.warn("cartId is undefined, cannot update Firestore.");
      }
    };

  async function deleteMenutem(documentId) {
    try {
      const docRef = doc(db, "cart", documentId);
      await deleteDoc(docRef);

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        cart: arrayRemove(documentId),
      });
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  const handleShowMenuCardPopup = async () => {
    if (resMenuItem?.card?.info.addons) {
      if (
        cartItems.length >= 1 &&
        restaurantInfoFromCard?.restaurantId !== resInformation?.restaurantId
      ) {
        setShowResetCardPopup(true);
      } else {
        setShowMenuCardPopup(!showMenuCardPopup);
        counter = 0;
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
        // setCounter(newCounter);

        // const tempCartId = "temp_" + Date.now();

        const updatedCardInfo = {
          ...menuInfo,
          totalMenuItems: newCounter,
          // cartId: tempCartId,
        };

        const cartItemInfo = {
          cartItems: menuInfo,
          resInfo: resInformation,
          totalMenuItems: newCounter,
          userId: auth.currentUser.uid,
        };

        const cartId = await createCartAndLinkToUser(
          auth?.currentUser?.uid,
          cartItemInfo
        );

        disPatch(addResInfo(resInformation));

        // disPatch(addCartItems(updatedCardInfo));
        disPatch(addCartItems({ ...updatedCardInfo, cartId }));
      }
    }
  };

  const updatingCardItem = async (item, action, cartId) => {
    // setCounter(item);

    const updatedCardInfo = {
      ...menuInfo,
      totalMenuItems: item, // Use the latest item count directly
      action: action,
      cartId,
    };

    // disPatch(updateCardItems(updatedCardInfo));

    disPatch(
      updateCardItemAndFirestore(
        { ...menuInfo, totalMenuItems: item },
        action,
        cartId
      )
    );

    if (item === 0) {
      disPatch(removeCardItems(updatedCardInfo));
      await deleteMenutem(cartId);
    }
  };

  return (
    <>
      {/* <div className="w-full h-[0.3px] bg-slate-700"></div> */}
      <div className="flex justify-between py-6">
        <div className="w-3/4">
          {resMenuItem?.card?.info?.itemAttribute?.vegClassifier ===
          "NONVEG" ? (
            <img src={nonVeg} />
          ) : (
            <img src={veg} />
          )}
          <h2 className="text-xl font-semibold">
            {" "}
            {resMenuItem?.card?.info?.name}
          </h2>
          <p className="mt-2">
            ₹
            {resMenuItem?.card?.info?.price
              ? resMenuItem?.card?.info?.price / 100
              : resMenuItem?.card?.info?.defaultPrice / 100}
            <span>
              {resMenuItem?.card?.info?.offerTags?.[0].title ? " 🏷️" : ""}
              {resMenuItem?.card?.info?.offerTags?.[0].title}{" "}
              {resMenuItem?.card?.info?.offerTags?.[0].subTitle}
            </span>
          </p>
          {resMenuItem?.card?.info?.ratings?.aggregatedRating?.rating ? (
            <p className="text-[12px] py-3">
              ❇️
              {`${resMenuItem?.card?.info?.ratings?.aggregatedRating?.rating}(
                    ${resMenuItem?.card?.info?.ratings?.aggregatedRating?.ratingCountV2}
                )`}
            </p>
          ) : (
            ""
          )}

          <p>
            {!showMore &&
            resMenuItem?.card?.info?.description?.split("").length >= 160
              ? resMenuItem?.card?.info?.description?.split("").slice(0, 160)
              : resMenuItem?.card?.info?.description}
            <span className="ml-1 font-semibold" onClick={handleShowMore}>
              {!showMore &&
              resMenuItem?.card?.info?.description?.split("").length >= 160
                ? "....More"
                : ""}
            </span>
          </p>
        </div>
        <div className="relative">
          {resMenuItem?.card?.info?.imageId ? (
            <div
              className="w-[156px] h-[144px]"
              onClick={handleShowPopup}
              ref={detailMenuButtonRef}
            >
              <img
                src={IMG_MENU + resMenuItem?.card?.info?.imageId}
                className="object-cover w-[156px] h-[144px] rounded-2xl"
              />
            </div>
          ) : (
            // <div className="w-[156px]"></div>
            ""
          )}
          <div
            className={
              resMenuItem?.card?.info?.imageId
                ? `absolute top-[124px] left-5`
                : `absolute top-[30px] right-5`
            }
          >
            {counter === 0 && (
              <div ref={addonButtonRef}>
                <button
                  className="px-10 py-2 bg-slate-900 text-emerald-500 shadow-lg"
                  onClick={handleShowMenuCardPopup}
                  ref={addResetRef}
                >
                  ADD
                </button>
              </div>
            )}

            {counter >= 1 && (
              <div className="w-[120px] h-10 bg-slate-900 text-emerald-500 rounded-xl flex items-center justify-center">
                <div className="flex justify-center items-center gap-7">
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
          <div className="pt-6 pl-6">
            {resMenuItem?.card?.info.addons && <p className="">Customisable</p>}
          </div>
        </div>
      </div>
      <div className="w-full h-[0.1px] bg-slate-800"></div>

      {showPopup && (
        <>
          <div className="overlay"></div>
          <div ref={menuDishesCardRef}>
            <PopupSearchDishesCard
              searchDishesData={resMenuItem?.card}
              handleShowPopup={handleShowPopup}
            />
          </div>
        </>
      )}

      {((showMenuCardPopup && resMenuItem?.card?.info.addons) ||
        showPopupBeforeReset) && (
        <>
          <div className="overlay"></div>
          <div ref={menuItemCardRef}>
            <PopupCardMenu
              searchDishesData={resMenuItem?.card}
              setShowMenuCardPopup={setShowMenuCardPopup}
              resInformation={resInformation}
              counter={counter}
              resId={resInformation?.restaurantId}
              setShowPopupBeforeReset={setShowPopupBeforeReset}
              showPopupBeforeReset={showPopupBeforeReset}
              // showMenuCardPopup={showMenuCardPopup}
              onContinue={handleContinueClick}
            />
          </div>
        </>
      )}

      {showResetCardPopup && (
        <>
          <div className="overlay"></div>
          <div ref={resetPopupCardRef}>
            <PopupResetCard
              setShowResetCardPopup={setShowResetCardPopup}
              resInformation={resInformation}
              menuInfo={menuInfo}
              counter={counter}
              setShowPopupBeforeReset={setShowPopupBeforeReset}
              searchDishesData={resMenuItem?.card}
              // setShowMenuCardPopup={setShowMenuCardPopup}
            />
          </div>
        </>
      )}

      {/* <div className="w-full h-[0.3px] bg-slate-700"></div> */}
    </>
  );
};

export default MenuItemCard;
