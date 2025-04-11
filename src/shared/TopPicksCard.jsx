import { TOP_PIC_IMG } from "../utils/constant";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { useDispatch, useSelector } from "react-redux";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useRef, useState } from "react";
import {
  addCartItems,
  addResInfo,
  removeCardItems,
  updateCardItems,
} from "../utils/cartSlice";
import PopupResetCard from "./PopupResetCard";
import PopupCardMenu from "./PopupCardMenu";
import useOutSideClick from "../hooks/useOutsideClick";

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
  const disPatch = useDispatch();
  const restaurantInfoFromCard = useSelector((state) => state.cart.resInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const menuItem = cartItems.find(
    (item) => item.menuId === topPicksData?.info?.id
  );
  let counter = menuItem?.totalMenuItems || 0;

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

  const menuInfo = {
    menuId: topPicksData?.info?.id,
    resId: resInformation?.info?.restaurantId,
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

  const handleShowMenuCardPopup = () => {
    if (topPicksData?.info?.addons) {
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
      <div className="w-[292px] h-[330px] bg-cyan-950 border-slate-200  ">
        <img
          src={TOP_PIC_IMG + topPicksData?.info?.imageId}
          className="w-full h-full object-cover rounded-3xl  border-2"
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
            <img src={nonVeg} />
          ) : (
            <img src={veg} />
          )}
          <h2 className="font-semibold text-[19px] mt-1 line-clamp-2">
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
