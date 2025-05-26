import { TOP_PIC_IMG } from "../utils/constant";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { useSelector } from "react-redux";

import { useRef, useState } from "react";

import PopupResetCard from "./PopupResetCard";
import PopupCardMenu from "./PopupCardMenu";
import useOutSideClick from "../hooks/useOutsideClick";
import AddMenuItemToCart from "./AddMenuItemToCart";

/* eslint-disable react/prop-types */
const TopPicksCard = ({ topPicksData, resInformation }) => {
  const [showMenuCardPopup, setShowMenuCardPopup] = useState(false);
  const [showResetCardPopup, setShowResetCardPopup] = useState(false);
  const [disableOutsideClick, setDisableOutsideClick] = useState(false);
  const [showPopupBeforeReset, setShowPopupBeforeReset] = useState(false);
  const addonButtonRef = useRef(null);
  const addResetRef = useRef(null);
  const menuItemCardRef = useRef(null);
  const resetPopupCardRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const menuItem = cartItems.find(
    (item) => item.menuId === topPicksData?.info?.id
  );
  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));
  const userMenuItem = userCartItems?.items?.[0]?.find(
    (item) => item.menuId === topPicksData?.info?.id
  );
  let counter = menuItem?.totalMenuItems || userMenuItem?.totalMenuItems || 0;

  //   useOutSideClick(
  //     menuDishesCardRef,
  //     () => setShowPopup(false),
  //     detailMenuButtonRef
  //   );
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

  // console.log(resInformation);

  const menuInfo = {
    menuId: topPicksData?.info?.id,
    resId: resInformation && resInformation?.restaurantId,
    menuName: topPicksData?.info?.name,
    vegClassifier: topPicksData?.info?.itemAttribute?.vegClassifier,
    menuPrice: topPicksData?.info?.price
      ? topPicksData?.info?.price / 100
      : topPicksData?.info?.defaultPrice / 100,
  };

  const handleContinueClick = () => {
    setDisableOutsideClick(true);
    setTimeout(() => setDisableOutsideClick(false), 100);
  };

  return (
    <>
      <div className="w-[250px] sm:w-[292px] h-[300px] sm:h-[330px] shrink-0  bg-cyan-950 border-slate-200  slide">
        <img
          src={TOP_PIC_IMG + topPicksData?.info?.imageId}
          className="w-full h-full object-cover rounded-3xl  border-2"
          loading="lazy"
        />

        <div
          className="absolute top-0 left-0 w-full h-full rounded-3xl z-50 pointer-events-none "
          style={{
            boxShadow: "inset 0 0 50px 60px rgba(0, 0, 0, 0.8)",
          }}
        ></div>

        {/* <div className="flex-col absolute top-0 z-100 ">
         
        </div> */}

        <div className="absolute w-full h-40 top-0 z-100 bg-gradient-to-t from-transparent via-slate-900/100 to-slate-900 pt-5 px-5">
          {topPicksData?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
            <img src={nonVeg} className="w-4 sm:w-5" loading="lazy" />
          ) : (
            <img src={veg} className="w-4 sm:w-5" loading="lazy" />
          )}
          <h2 className="font-semibold text-[17px] sm:text-[19px] mt-1 line-clamp-2">
            {topPicksData?.info?.name}
          </h2>
          <p className="text-[12px] font-extralight text-gray-300 w-full mt-1 line-clamp-2">
            {topPicksData?.info?.description?.split(",").join(" | ")}
          </p>
        </div>

        <div className="absolute bottom-0 w-full h-20 z-100 flex justify-between items-center bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900 px-5">
          <div>
            ₹
            {topPicksData?.info?.price
              ? topPicksData?.info?.price / 100
              : topPicksData?.info?.defaultPrice / 100}
          </div>
        </div>
        <div className="absolute top-[130px] sm:top-[140px] right-[130px] sm:right-[152px] z-100">
          <AddMenuItemToCart
            resInformation={resInformation}
            resMenuItem={topPicksData}
            menuInfo={menuInfo}
            addonButtonRef={addonButtonRef}
            addResetRef={addResetRef}
            setShowResetCardPopup={setShowResetCardPopup}
            showMenuCardPopup={showMenuCardPopup}
            setShowMenuCardPopup={setShowMenuCardPopup}
            setShowAddToCardSearchResultsData={false}
            menuItem={menuItem}
            userMenuItem={userMenuItem}
            counter={counter}
            cartItems={cartItems}
            isImage={true}
            topPicksData={true}
          />
        </div>
      </div>
      {((showMenuCardPopup && topPicksData?.info?.addons) ||
        showPopupBeforeReset) && (
        <>
          <div className="overlay"></div>
          <div ref={menuItemCardRef}>
            <PopupCardMenu
              searchDishesData={topPicksData}
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
              searchDishesData={topPicksData}
              // setShowMenuCardPopup={setShowMenuCardPopup}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TopPicksCard;
