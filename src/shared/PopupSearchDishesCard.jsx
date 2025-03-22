/* eslint-disable react/prop-types */

import { IMG_SEARCH_DISH_BANNER } from "../utils/constant";
import { HiMiniXMark } from "react-icons/hi2";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { IoAdd, IoRemove } from "react-icons/io5";

const PopupSearchDishesCard = ({
  searchDishesData,
  handleShowPopup,
  counter,
  handleShowMenuCardPopup,
  goToSearchResultsPage,
  updatingCardItem,
  addResetRef,
  addonButtonRef,
  menuInfo,
  resInformation,
}) => {
  return (
    <div className="w-[500px] h-auto bg-slate-800 fixed z-[11999] top-15 right-[34%] rounded-3xl ">
      <div className="w-full h-[400px]">
        <img
          src={IMG_SEARCH_DISH_BANNER + searchDishesData?.info?.imageId}
          className="rounded-t-3xl w-full h-[400px] object-cover"
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
      <div className="flex-col py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex-col">
            <div>
              {searchDishesData?.info?.isVeg === 1 ? (
                <img src={veg} />
              ) : (
                <img src={nonVeg} />
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
              <span className="text-sm">
                {searchDishesData?.info?.offerTags?.[0].title ? " 🏷️" : ""}
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
          </div>
          {/* <button className="text-emerald-500 px-10 py-2 rounded-xl bg-slate-700 shadow-2xl">
            ADD
          </button> */}
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
        <div className="mt-2 mb-2 font-light">
          {searchDishesData?.info?.description}
        </div>
      </div>
    </div>
  );
};

export default PopupSearchDishesCard;
