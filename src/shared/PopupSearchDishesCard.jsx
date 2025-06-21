/* eslint-disable react/prop-types */

import { IMG_SEARCH_DISH_BANNER } from "../utils/constant";
import { HiMiniXMark } from "react-icons/hi2";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";

import AddMenuItemToCart from "./AddMenuItemToCart";
import PopupUpdateCard from "./PopupUpdateCard";

const PopupSearchDishesCard = ({
  searchDishesData,
  handleShowPopup,
  counter,

  setShowResetCardPopup,
  showMenuCardPopup,
  setShowMenuCardPopup,
  addResetRef,
  addonButtonRef,

  menuInfo,
  resInformation,
  menuItem,
  userMenuItem,
  cartItems,
  userCartItems,
  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,
  showPopupBeforeUpdate,
  setShowPopupBeforeUpdate,
  setShowMenuCardPopupBeforeUpdate,
  updatePopupCardRef,
  addUpdateRef,
}) => {
  return (
    <div className="w-[350px] sm:w-[520px] h-auto bg-slate-800 fixed z-[1199955544433333333333] top-24 sm:top-12 right-[5%] sm:right-[34%] rounded-3xl">
      <div className="w-full  h-[200px] sm:h-[400px]">
        <img
          src={IMG_SEARCH_DISH_BANNER + searchDishesData?.info?.imageId}
          className="rounded-t-3xl w-full h-[200px] sm:h-[400px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute top-0 right-0">
        <div
          className="w-6 h-6 rounded-full bg-amber-500 flex justify-center items-center"
          onClick={handleShowPopup}
        >
          <HiMiniXMark />
        </div>
      </div>
      <div className="flex-col py-6 pl-4 pr-2">
        <div className="flex justify-between items-center relative">
          <div className="flex-col">
            <div>
              {searchDishesData?.info?.isVeg === 1 ? (
                <img src={veg} loading="lazy" />
              ) : (
                <img src={nonVeg} loading="lazy" />
              )}
            </div>
            <h2 className="text-[19px] font-semibold line-clamp-2 mt-1">
              {searchDishesData?.info?.name}
            </h2>
            <p className="mt-1">
              ₹
              {searchDishesData?.info?.price
                ? searchDishesData?.info?.price / 100
                : searchDishesData?.info?.defaultPrice / 100}
              {searchDishesData?.info?.finalPrice && (
                <div className="w-10 h-0.5 bg-slate-200 absolute top-[68px]"></div>
              )}
              <span className="ml-2">
                {searchDishesData?.info?.finalPrice &&
                  searchDishesData?.info?.finalPrice / 100}
              </span>
              <span className="text-[14px]">
                {searchDishesData?.info?.offerTags?.[0].title ||
                searchDishesData?.info?.finalPrice
                  ? " 🏷️"
                  : ""}
              </span>
              <span className="text-[12px]">
                {searchDishesData?.info?.offerTags?.[0].title}{" "}
                {searchDishesData?.info?.offerTags?.[0].subTitle}
              </span>
            </p>
            {searchDishesData?.info?.ratings?.aggregatedRating?.rating ? (
              <p className="text-[12px] py-3">
                ❇️
                {`${searchDishesData?.info?.ratings?.aggregatedRating?.rating}(
                    ${searchDishesData?.info?.ratings?.aggregatedRating?.ratingCountV2}
                )`}
              </p>
            ) : (
              ""
            )}
            <div className="text-[14px]">
              {searchDishesData?.info?.description}
            </div>
          </div>

          <div className="absolute right-[150px] -top-28">
            <AddMenuItemToCart
              resInformation={resInformation}
              resMenuItem={searchDishesData}
              menuInfo={menuInfo}
              addonButtonRef={addonButtonRef}
              addResetRef={addResetRef}
              setShowResetCardPopup={setShowResetCardPopup}
              showMenuCardPopup={showMenuCardPopup}
              setShowMenuCardPopup={setShowMenuCardPopup}
              setShowAddToCardSearchResultsData={
                setShowAddToCardSearchResultsData
              }
              showAddToCardSearchResultsData={showAddToCardSearchResultsData}
              menuItem={menuItem}
              userMenuItem={userMenuItem}
              counter={counter}
              cartItems={cartItems}
              userCartItems={userCartItems}
              isImage={true}
              setShowPopupBeforeUpdate={setShowPopupBeforeUpdate}
              addUpdateRef={addUpdateRef}
            />
          </div>
          {showPopupBeforeUpdate && (
            <>
              <div className="overlay"></div>
              <div ref={updatePopupCardRef}>
                <PopupUpdateCard
                  setShowPopupBeforeUpdate={setShowPopupBeforeUpdate}
                  menuInfo={menuInfo}
                  menuItem={menuItem}
                  userMenuItem={userMenuItem}
                  counter={counter}
                  setShowMenuCardPopupBeforeUpdate={
                    setShowMenuCardPopupBeforeUpdate
                  }
                />
              </div>
            </>
          )}
        </div>
        {/* <div className="mt-2 mb-2 font-light">
          {searchDishesData?.info?.description}
        </div> */}
      </div>
    </div>
  );
};

export default PopupSearchDishesCard;
