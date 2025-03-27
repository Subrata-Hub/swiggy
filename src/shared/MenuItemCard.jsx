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

const MenuItemCard = ({ resMenuItem, resInformation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenuCardPopup, setShowMenuCardPopup] = useState(false);
  const [showResetCardPopup, setShowResetCardPopup] = useState(false);
  const [disableOutsideClick, setDisableOutsideClick] = useState(false);
  const [showPopupBeforeReset, setShowPopupBeforeReset] = useState(false);
  // const [counter, setCounter] = useState(0);

  const menuDishesCardRef = useRef(null);
  const menuItemCardRef = useRef(null);
  const addonButtonRef = useRef(null);
  const detailMenuButtonRef = useRef(null);
  const addResetRef = useRef(null);
  const resetPopupCardRef = useRef(null);
  const disPatch = useDispatch();

  const restaurantInfoFromCard = useSelector((state) => state.cart.resInfo);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const menuItem = cartItems.find(
    (item) => item.menuId === resMenuItem?.card?.info?.id
  );
  let counter = menuItem?.totalMenuItems || 0;

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

  const menuInfo = {
    menuId: resMenuItem?.card?.info?.id,
    resId: resInformation?.restaurantId,
    menuName: resMenuItem?.card?.info?.name,
    vegClassifier: resMenuItem?.card?.info?.itemAttribute?.vegClassifier,
    menuPrice: resMenuItem?.card?.info?.price
      ? resMenuItem?.card?.info?.price / 100
      : resMenuItem?.card?.info?.defaultPrice / 100,
  };

  const handleShowMenuCardPopup = () => {
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
        cartItems.length >= 1 &&
        restaurantInfoFromCard?.restaurantId !== resInformation?.restaurantId
      ) {
        setShowResetCardPopup(true);
      } else {
        const newCounter = counter + 1;
        // setCounter(newCounter);

        const updatedCardInfo = {
          ...menuInfo,
          totalMenuItems: newCounter,
        };

        disPatch(addResInfo(resInformation));

        disPatch(addCartItems(updatedCardInfo));
      }
    }
  };

  const updatingCardItem = (item, action) => {
    // setCounter(item);

    const updatedCardInfo = {
      ...menuInfo,
      totalMenuItems: item, // Use the latest item count directly
      action: action,
    };

    disPatch(updateCardItems(updatedCardInfo));

    if (item === 0) {
      disPatch(removeCardItems(updatedCardInfo));
    }
  };

  return (
    <>
      <div className="w-full h-[1px] bg-slate-500"></div>
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

          <p className="mt-2">{resMenuItem?.card?.info?.description}</p>
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
                  <div onClick={() => updatingCardItem(counter - 1, "Remove")}>
                    {" "}
                    <IoRemove />
                  </div>

                  <p className=""> {counter}</p>

                  <div
                    className=""
                    onClick={() => updatingCardItem(counter + 1, "Add")}
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

      <div className="w-full h-[1px] bg-slate-500"></div>
    </>
  );
};

export default MenuItemCard;
