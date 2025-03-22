/* eslint-disable react/prop-types */
import { HiArrowSmallRight } from "react-icons/hi2";
import { IMG_SEARCH_DISH } from "../utils/constant";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";

import useOutSideClick from "../hooks/useOutsideClick";
import PopupSearchDishesCard from "./PopupSearchDishesCard";
import PopupCardMenu from "./PopupCardMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItems,
  addResInfo,
  removeCardItems,
  updateCardItems,
} from "../utils/cartSlice";
import PopupResetCard from "./PopupResetCard";
import { addResParams } from "../utils/searchSlice";
import { toast } from "react-toastify";
const SearchDishesCard = ({
  searchDishesData,
  resInformationForMoreDishes,
  hideHeader = false,
  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,
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
  const dispatch = useDispatch();

  const restaurantInfoFromCard = useSelector((state) => state.cart.resInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const menuItem = cartItems.find(
    (item) => item.menuId === searchDishesData?.info?.id
  );
  let counter = menuItem?.totalMenuItems || 0;

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
    vegClassifier: searchDishesData?.info?.itemAttribute?.vegClassifier,
    menuPrice: searchDishesData?.info?.price
      ? searchDishesData?.info?.price / 100
      : searchDishesData?.info?.defaultPrice / 100,
  };

  const handleShowMenuCardPopup = () => {
    if (searchDishesData?.info.addons) {
      if (
        restaurantInfoFromCard &&
        cartItems.length >= 1 &&
        restaurantInfoFromCard?.restaurantId !==
          // searchDishesData?.restaurant?.info?.id
          // (resInformation
          //   ? resInformation?.restaurantId
          //   : resInformationForMoreDishes?.restaurantId)
          (resInformationForMoreDishes?.restaurantId ||
            resInformation?.restaurantId)
      ) {
        setShowResetCardPopup(true);

        // setShowMenuCardPopup(false);
      } else {
        setShowMenuCardPopup(!showMenuCardPopup);
        counter = 0;
      }
    } else {
      if (
        restaurantInfoFromCard &&
        cartItems.length >= 1 &&
        restaurantInfoFromCard?.restaurantId !==
          (resInformationForMoreDishes?.restaurantId ||
            resInformation?.restaurantId)
      ) {
        setShowResetCardPopup(true);
      } else {
        const newCounter = counter + 1;
        // setCounter(newCounter);

        const updatedCardInfo = {
          ...menuInfo,
          totalMenuItems: newCounter,
        };

        dispatch(addResInfo(resInformationForMoreDishes || resInformation));
        dispatch(addCartItems(updatedCardInfo));
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

    dispatch(updateCardItems(updatedCardInfo));

    if (item === 0) {
      dispatch(removeCardItems(updatedCardInfo));
    }
  };

  const goToSearchResultsPage = (resId, menuId) => {
    // if (showResetCardPopup) return;
    if (!searchDishesData?.info?.addons && resId && menuId) {
      dispatch(
        addResParams({
          resId: resId,
          menuId: menuId,
        })
      );

      setShowAddToCardSearchResultsData(!showAddToCardSearchResultsData);
      toast(`Add item to the card from ${resInformation.restaurantName}`);
    }
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
                    to={`/city/kolkata/${searchDishesData?.restaurant?.info?.name}/${searchDishesData?.restaurant?.info?.areaName}/${searchDishesData?.restaurant?.info?.id}`}
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
            <div className="w-[156px] h-[144px] relative">
              <img
                src={IMG_SEARCH_DISH + searchDishesData?.info?.imageId}
                className="w-[156px] h-[144px] object-cover rounded-2xl"
              />
              <div className="absolute top-[124px] left-5">
                {!counter && (
                  <div ref={addonButtonRef}>
                    <button
                      className="px-10 py-2 bg-slate-900 text-emerald-500 rounded-xl"
                      onClick={() => {
                        handleShowMenuCardPopup(); // Execute first function
                        setTimeout(() => {
                          goToSearchResultsPage(
                            resInformation?.restaurantId,
                            menuInfo?.menuId
                          );
                        }, 2000); // Ensures this runs after state updates in handleShowMenuCardPopup
                      }}
                      ref={addResetRef}
                    >
                      ADD
                    </button>
                  </div>
                )}

                {(counter || counter > 0) && (
                  <div className="w-[120px] h-10 bg-slate-900 text-emerald-500 rounded-xl flex items-center justify-center">
                    <div className="flex justify-center items-center gap-7">
                      <div
                        onClick={() => updatingCardItem(counter - 1, "Remove")}
                      >
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
              <div className="pt-5 pl-7 text-[13.5px]">
                {searchDishesData?.info?.addons && (
                  <p className="">Customisable</p>
                )}
              </div>
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
              handleShowMenuCardPopup={handleShowMenuCardPopup}
              goToSearchResultsPage={goToSearchResultsPage}
              updatingCardItem={updatingCardItem}
              addResetRef={addResetRef}
              addonButtonRef={addonButtonRef}
              menuInfo={menuInfo}
              resInformation={resInformation}
            />
          </div>
        </>
      )}
      {((showMenuCardPopup && searchDishesData?.info.addons) ||
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
              // showMenuCardPopup={showMenuCardPopup}
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
