/* eslint-disable react/prop-types */
import { HiArrowSmallRight } from "react-icons/hi2";
import { IMG_SEARCH_DISH } from "../utils/constant";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import useOutSideClick from "../hooks/useOutsideClick";
import PopupSearchDishesCard from "./PopupSearchDishesCard";
import PopupCardMenu from "./PopupCardMenu";
import { useSelector } from "react-redux";

import PopupResetCard from "./PopupResetCard";

import AddMenuItemToCart from "./AddMenuItemToCart";
import PopupUpdateCard from "./PopupUpdateCard";
const SearchDishesCard = ({
  city,
  searchDishesData,
  resInformationForMoreDishes,
  hideHeader = false,
  showAddToCardSearchResultsData,
  setShowAddToCardSearchResultsData,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showResetCardPopup, setShowResetCardPopup] = useState(false);
  const [showMenuCardPopup, setShowMenuCardPopup] = useState(false);
  const [disableOutsideClick, setDisableOutsideClick] = useState(false);
  const [showPopupBeforeReset, setShowPopupBeforeReset] = useState(false);
  const [showMenuCardPopupBeforeUpdate, setShowMenuCardPopupBeforeUpdate] =
    useState(false);
  const [showPopupBeforeUpdate, setShowPopupBeforeUpdate] = useState(false);

  const searchDishesCardRef = useRef(null);
  const menuItemCardRef = useRef(null);
  const addonButtonRef = useRef(null);
  const detailMenuButtonRef = useRef(null);
  const addResetRef = useRef(null);
  const resetPopupCardRef = useRef(null);
  const updatePopupCardRef = useRef(null);
  const addUpdateRef = useRef(null);

  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));
  const cartItems = useSelector((state) => state.cart.cartItems);

  const menuItem = cartItems.find(
    (item) => item.menuId === searchDishesData?.info?.id
  );

  const totalMenuItem = cartItems.filter(
    (item) => item.menuId === searchDishesData?.info?.id
  );

  const totalMenuItemsCount = totalMenuItem
    ?.map((item) => item?.totalMenuItems)
    .reduce((acc, item) => acc + item, 0);

  const userMenuItem = userCartItems?.cartItems?.find(
    (item) => item.menuId === searchDishesData?.info?.id
  );

  const totalUserMenuItem = userCartItems?.cartItems?.filter(
    (item) => item.menuId === searchDishesData?.info?.id
  );

  const totalUserMenuItemCount = totalUserMenuItem
    ?.map((item) => item.totalMenuItems)
    .reduce((acc, item) => acc + item, 0);

  let counter = totalMenuItemsCount || totalUserMenuItemCount || 0;

  useOutSideClick(
    searchDishesCardRef,
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
      }
    },
    addResetRef
  );

  useOutSideClick(
    updatePopupCardRef,
    () => {
      if (!disableOutsideClick) {
        setShowPopupBeforeUpdate(false);
        // setShowResetCardPopup(false);
      }
    },
    addUpdateRef
  );

  const handleContinueClick = () => {
    setDisableOutsideClick(true);
    setTimeout(() => setDisableOutsideClick(false), 100);
  };

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  const resInformation = {
    restaurantId: searchDishesData?.restaurant?.info?.id,
    restaurantName: searchDishesData?.restaurant?.info?.name,
    resAreaName: searchDishesData?.restaurant?.info?.locality,
    resImg: searchDishesData?.restaurant?.info?.cloudinaryImageId,
    menuURL: `/city/${city}/${searchDishesData?.restaurant?.info?.name}/${searchDishesData?.restaurant?.info?.locality}/${searchDishesData?.restaurant?.info?.id}`,
  };

  const menuInfo = {
    menuId: searchDishesData?.info?.id,
    resId:
      resInformationForMoreDishes?.restaurantId || resInformation?.restaurantId,
    menuName: searchDishesData?.info?.name,
    // vegClassifier: searchDishesData?.info?.itemAttribute?.vegClassifier,
    vegClassifier: searchDishesData?.info?.isVeg === 1 ? "VEG" : "NONVEG",

    menuPrice: searchDishesData?.info?.price
      ? searchDishesData?.info?.price / 100
      : searchDishesData?.info?.defaultPrice / 100,

    finalmenuPrice:
      (searchDishesData?.info?.finalPrice &&
        searchDishesData?.info?.finalPrice / 100) ||
      0,

    addons: searchDishesData?.info?.addons || [],
  };

  return (
    <>
      <div
        className={`bg-slate-800  w-[380px] xs:w-[380px] sm:w-[280px] md:w-[320px] lg:w-[430px] xl:w-[438px]  ${
          !hideHeader ? "h-[287px]" : "h-[200px]"
        } mb-2 rounded-2xl`}
      >
        <div className="flex-col">
          {!hideHeader ? (
            <div className="">
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex-col">
                  <p className="text-[15px] font-semibold">
                    {searchDishesData?.restaurant?.info?.name}
                  </p>
                  <div className="text-[12px] mt-2 font-extralight">
                    <span>
                      ❇️{searchDishesData?.restaurant?.info?.avgRatingString} .{" "}
                      {searchDishesData?.restaurant?.info?.sla?.slaString}
                    </span>
                  </div>
                </div>

                <div>
                  <Link
                    to={`/city/${city}/${searchDishesData?.restaurant?.info?.name}/${searchDishesData?.restaurant?.info?.areaName}/${searchDishesData?.restaurant?.info?.id}`}
                  >
                    <HiArrowSmallRight className="text-2xl" />
                  </Link>
                </div>
              </div>
              <div className="w-full h-0.5 bg-slate-700 mt-3"></div>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between items-center py-4 px-3">
            <div className="flex-col w-1/2">
              {searchDishesData?.info?.isVeg === 1 ? (
                <img src={veg} loading="lazy" />
              ) : (
                <img src={nonVeg} loading="lazy" />
              )}
              <h2 className="text-[19px] font-semibold line-clamp-2">
                {searchDishesData?.info?.name}
              </h2>
              <div className="flex gap-1 mt-1 relative">
                <span>
                  ₹
                  {searchDishesData?.info?.price
                    ? searchDishesData?.info?.price / 100
                    : searchDishesData?.info?.defaultPrice / 100}
                </span>
                {searchDishesData?.info?.finalPrice && (
                  <div className="w-8 h-0.5 bg-slate-200 absolute top-[12px]"></div>
                )}
                <span className="ml-2">
                  {searchDishesData?.info?.finalPrice &&
                    searchDishesData?.info?.finalPrice / 100}
                </span>
              </div>

              <button
                className="px-4 py-2 rounded-2xl text-xs bg-slate-700 mt-4 flex items-center gap-2"
                onClick={handleShowPopup}
                ref={detailMenuButtonRef}
              >
                More Details{" "}
                <span>
                  {" "}
                  <HiArrowSmallRight className="text-[12px]" />
                </span>
              </button>
            </div>
            <div className="relative">
              {searchDishesData?.info?.imageId ? (
                <img
                  src={IMG_SEARCH_DISH + searchDishesData?.info?.imageId}
                  className="w-[136px] sm:w-[156px] h-[130px] sm:h-[144px] object-cover rounded-2xl"
                  loading="lazy"
                />
              ) : (
                <div className="w-[136px] sm:w-[156px] h-[130px] sm:h-[144px] "></div>
              )}
              <AddMenuItemToCart
                resInformation={resInformationForMoreDishes || resInformation}
                resMenuItem={searchDishesData}
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
                setShowAddToCardSearchResultsData={
                  setShowAddToCardSearchResultsData
                }
                showAddToCardSearchResultsData={showAddToCardSearchResultsData}
                isImage={searchDishesData?.info?.imageId ? true : false}
                setShowPopupBeforeUpdate={setShowPopupBeforeUpdate}
                addUpdateRef={addUpdateRef}
                totalMenuItem={totalMenuItem}
              />
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <>
          <div className="overlay"></div>
          <div ref={searchDishesCardRef}>
            <PopupSearchDishesCard
              searchDishesData={searchDishesData}
              handleShowPopup={handleShowPopup}
              counter={counter}
              setShowResetCardPopup={setShowResetCardPopup}
              showMenuCardPopup={showMenuCardPopup}
              setShowMenuCardPopup={setShowMenuCardPopup}
              addResetRef={addResetRef}
              addonButtonRef={addonButtonRef}
              menuInfo={menuInfo}
              resInformation={resInformationForMoreDishes || resInformation}
              menuItem={menuItem}
              userMenuItem={userMenuItem}
              cartItems={cartItems}
              userCartItems={userCartItems}
              setShowAddToCardSearchResultsData={
                setShowAddToCardSearchResultsData
              }
              showAddToCardSearchResultsData={showAddToCardSearchResultsData}
              showPopupBeforeUpdate={showPopupBeforeUpdate}
              setShowPopupBeforeUpdate={setShowPopupBeforeUpdate}
              // showMenuCardPopupBeforeUpdate={showMenuCardPopupBeforeUpdate}
              setShowMenuCardPopupBeforeUpdate={
                setShowMenuCardPopupBeforeUpdate
              }
              updatePopupCardRef={updatePopupCardRef}
              addUpdateRef={addUpdateRef}
            />
          </div>
        </>
      )}
      {((showMenuCardPopup && searchDishesData?.info?.addons) ||
        showPopupBeforeReset ||
        showMenuCardPopupBeforeUpdate) && (
        <>
          <div className="overlay"></div>
          <div ref={menuItemCardRef}>
            <PopupCardMenu
              searchDishesData={searchDishesData}
              setShowMenuCardPopup={setShowMenuCardPopup}
              resInformation={resInformationForMoreDishes || resInformation}
              counter={counter}
              resId={
                resInformationForMoreDishes?.restaurantId ||
                resInformation?.restaurantId
              }
              setShowPopupBeforeReset={setShowPopupBeforeReset}
              showPopupBeforeReset={showPopupBeforeReset}
              onContinue={handleContinueClick}
              setShowPopupBeforeUpdate={setShowPopupBeforeUpdate}
              showMenuCardPopupBeforeUpdate={showMenuCardPopupBeforeUpdate}
              setShowMenuCardPopupBeforeUpdate={
                setShowMenuCardPopupBeforeUpdate
              }
              menuItem={menuItem}
              userMenuItem={userMenuItem}
              setShowAddToCardSearchResultsData={
                setShowAddToCardSearchResultsData
              }
              showAddToCardSearchResultsData={showAddToCardSearchResultsData}
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
              resInformation={resInformationForMoreDishes || resInformation}
              menuInfo={menuInfo}
              counter={counter}
              setShowPopupBeforeReset={setShowPopupBeforeReset}
              searchDishesData={searchDishesData}
              setShowAddToCardSearchResultsData={
                setShowAddToCardSearchResultsData
              }
            />
          </div>
        </>
      )}

      {showPopupBeforeUpdate && (
        <>
          <div className="overlay"></div>
          <div ref={updatePopupCardRef}>
            <PopupUpdateCard
              setShowPopupBeforeUpdate={setShowPopupBeforeUpdate}
              menuInfo={menuInfo}
              // menuItem={menuItem}
              // userMenuItem={userMenuItem}
              menuItem={
                totalMenuItem?.length > 0 &&
                totalMenuItem[totalMenuItem?.length - 1]
              }
              userMenuItem={
                totalUserMenuItem?.length > 0 &&
                totalUserMenuItem[totalUserMenuItem?.length - 1]
              }
              // counter={counter}
              setShowMenuCardPopupBeforeUpdate={
                setShowMenuCardPopupBeforeUpdate
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default SearchDishesCard;
