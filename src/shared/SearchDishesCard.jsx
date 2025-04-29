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
const SearchDishesCard = ({
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

  const searchDishesCardRef = useRef(null);
  const menuItemCardRef = useRef(null);
  const addonButtonRef = useRef(null);
  const detailMenuButtonRef = useRef(null);
  const addResetRef = useRef(null);
  const resetPopupCardRef = useRef(null);

  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userMenuItem = userCartItems?.items?.[0]?.find(
    (item) => item.menuId === searchDishesData?.info?.id
  );
  const placeData = useSelector(
    (store) => store.firebaseData?.userLocationData
  );
  const placeArray = placeData?.address_components?.filter((cityList) =>
    cityList?.types?.find((item) => item === "city")
  );

  const city = placeArray?.[0]?.long_name;
  const menuItem = cartItems.find(
    (item) => item.menuId === searchDishesData?.info?.id
  );
  let counter = menuItem?.totalMenuItems || userMenuItem?.totalMenuItems || 0;

  useOutSideClick(searchDishesCardRef, () => {
    if (!disableOutsideClick) {
      setShowPopup(false);
      // setShowPopupBeforeReset(false);
    }

    detailMenuButtonRef;
  });
  useOutSideClick(
    menuItemCardRef,
    () => {
      if (!disableOutsideClick) {
        setShowMenuCardPopup(false);
        // setShowPopupBeforeReset(false);
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
    menuURL: `/city/kolkata/${searchDishesData?.restaurant?.info?.name}/${searchDishesData?.restaurant?.info?.locality}/${searchDishesData?.restaurant?.info?.id}`,
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
  };

  return (
    <>
      <div
        className={`bg-slate-800 w-[438px] ${
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
                <img src={veg} />
              ) : (
                <img src={nonVeg} />
              )}
              <h2 className="text-[19px] font-semibold line-clamp-2">
                {searchDishesData?.info?.name}
              </h2>
              <p>
                ₹
                {searchDishesData?.info?.price
                  ? searchDishesData?.info?.price / 100
                  : searchDishesData?.info?.defaultPrice / 100}
              </p>
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
                  className="w-[156px] h-[144px] object-cover rounded-2xl"
                />
              ) : (
                <div className="w-[156px] h-[144px] "></div>
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
                // goToSearchResultsPage={goToSearchResultsPage}
                menuItem={menuItem}
                userMenuItem={userMenuItem}
                counter={counter}
                cartItems={cartItems}
                userCartItems={userCartItems}
                setShowAddToCardSearchResultsData={
                  setShowAddToCardSearchResultsData
                }
                showAddToCardSearchResultsData={showAddToCardSearchResultsData}
                // isSearchResults={true}
                isImage={searchDishesData?.info?.imageId ? true : false}
              />

              {/* <div className="pt-5 pl-7 text-[13.5px]">
                {searchDishesData?.info?.addons && (
                  <p className="">Customisable</p>
                )}
              </div> */}
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
              resInformation={resInformation}
              menuItem={menuItem}
              userMenuItem={userMenuItem}
              cartItems={cartItems}
              userCartItems={userCartItems}
              setShowAddToCardSearchResultsData={
                setShowAddToCardSearchResultsData
              }
              showAddToCardSearchResultsData={showAddToCardSearchResultsData}
            />
          </div>
        </>
      )}
      {((showMenuCardPopup && searchDishesData?.info?.addons) ||
        showPopupBeforeReset) && (
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
    </>
  );
};

export default SearchDishesCard;
