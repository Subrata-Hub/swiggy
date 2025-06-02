/* eslint-disable react/prop-types */

import { IMG_MENU } from "../utils/constant";
import { useRef, useState } from "react";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";

import useOutSideClick from "../hooks/useOutsideClick";

import PopupCardMenu from "./PopupCardMenu";

import { useSelector } from "react-redux";

import PopupResetCard from "./PopupResetCard";

import AddMenuItemToCart from "./AddMenuItemToCart";
import PopupSearchDishesCard from "./PopupSearchDishesCard";

const MenuItemCard = ({ resMenuItem, resInformation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenuCardPopup, setShowMenuCardPopup] = useState(false);
  const [showResetCardPopup, setShowResetCardPopup] = useState(false);
  const [disableOutsideClick, setDisableOutsideClick] = useState(false);
  const [showPopupBeforeReset, setShowPopupBeforeReset] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const menuCardRef = useRef(null);
  const menuItemCardRef = useRef(null);
  const addonButtonRef = useRef(null);
  const detailMenuButtonRef = useRef(null);
  const addResetRef = useRef(null);
  const resetPopupCardRef = useRef(null);

  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));

  const cartItems = useSelector((state) => state.cart.cartItems);
  const menuItem = cartItems.find(
    (item) => item.menuId === resMenuItem?.card?.info?.id
  );

  const userMenuItem = userCartItems?.items?.[0]?.find(
    (item) => item.menuId === resMenuItem?.card?.info?.id
  );

  let counter = menuItem?.totalMenuItems || userMenuItem?.totalMenuItems || 0;

  useOutSideClick(
    menuCardRef,
    () => {
      if (!disableOutsideClick) {
        setShowPopup(false);
      }
    },

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
    console.log("fvkbknknk");
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
  };

  return (
    <>
      <div
        className={`flex justify-between gap-2 py-6 ${
          resMenuItem?.card?.info?.description ? "mb-5" : "mb-8"
        }`}
      >
        <div className="w-3/4">
          {resMenuItem?.card?.info?.itemAttribute?.vegClassifier ===
          "NONVEG" ? (
            <img src={nonVeg} className="w-4 sm:w-5" loading="lazy" />
          ) : (
            <img src={veg} className="w-4 sm:w-5" loading="lazy" />
          )}
          <h2 className="text-[17px] sm:text-xl font-semibold">
            {" "}
            {resMenuItem?.card?.info?.name}
          </h2>
          <p className="mt-1 sm:mt-2">
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
            <p className="text-[12px] py-1.5 sm:py-3">
              ❇️
              {`${resMenuItem?.card?.info?.ratings?.aggregatedRating?.rating}(
                    ${resMenuItem?.card?.info?.ratings?.aggregatedRating?.ratingCountV2}
                )`}
            </p>
          ) : (
            ""
          )}

          <p className="text-[13px] sm:text-[15px] md:text-[16px]">
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
              className=""
              onClick={handleShowPopup}
              ref={detailMenuButtonRef}
            >
              <img
                src={IMG_MENU + resMenuItem?.card?.info?.imageId}
                className="object-cover w-[140px] sm:w-[156px] h-[130px] sm:h-[144px] rounded-2xl"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-[156px] h-[144px]"></div>
          )}

          <AddMenuItemToCart
            resInformation={resInformation}
            resMenuItem={resMenuItem}
            menuInfo={menuInfo}
            addonButtonRef={addonButtonRef}
            addResetRef={addResetRef}
            setShowResetCardPopup={setShowResetCardPopup}
            showMenuCardPopup={showMenuCardPopup}
            setShowMenuCardPopup={setShowMenuCardPopup}
            menuItem={menuItem}
            userMenuItem={userMenuItem}
            counter={counter}
            cartItems={cartItems}
            userCartItems={userCartItems}
            isImage={resMenuItem?.card?.info?.imageId ? true : false}
          />
        </div>
      </div>
      <div className="w-full h-[0.1px] bg-slate-800"></div>

      {showPopup && (
        <>
          <div className="overlay"></div>
          <div ref={menuCardRef}>
            <PopupSearchDishesCard
              searchDishesData={resMenuItem?.card}
              handleShowPopup={handleShowPopup}
              counter={counter}
              setShowResetCardPopup={setShowResetCardPopup}
              showMenuCardPopup={showMenuCardPopup}
              setShowMenuCardPopup={setShowMenuCardPopup}
              addResetRef={addResetRef}
              addonButtonRef={addonButtonRef}
              menuInfo={menuInfo}
              resInformation={resInformation}
              menuItem={menuItem}
              userMenuItem={userMenuItem}
              cartItems={cartItems}
              userCartItems={userCartItems}
            />
          </div>
        </>
      )}

      {((showMenuCardPopup && resMenuItem?.card?.info?.addons) ||
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
            />
          </div>
        </>
      )}
    </>
  );
};

export default MenuItemCard;
