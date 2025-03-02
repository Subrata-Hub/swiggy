/* eslint-disable react/prop-types */

import { IMG_MENU } from "../utils/constant";
import { useRef, useState } from "react";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";

import useOutSideClick from "../hooks/useOutsideClick";
import PopupSearchDishesCard from "./PopupSearchDishesCard";

const MenuItemCard = ({ resMenuItem }) => {
  const [showPopup, setShowPopup] = useState(false);

  const menuDishesCardRef = useRef(null);

  useOutSideClick(menuDishesCardRef, () => setShowPopup(false));

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
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
          <p>
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

          <p>{resMenuItem?.card?.info?.description}</p>
        </div>
        <div ref={menuDishesCardRef} onClick={handleShowPopup}>
          {resMenuItem?.card?.info?.imageId && (
            <div
              className="w-[156px] h-[144px]"
              // onClick={handleShowPopup}
              // ref={menuDishesCardRef}
            >
              <img
                src={IMG_MENU + resMenuItem?.card?.info?.imageId}
                className="object-cover w-[156px] h-[144px] rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <>
          <div className="overlay"></div>
          <PopupSearchDishesCard
            searchDishesData={resMenuItem?.card}
            handleShowPopup={handleShowPopup}
          />
        </>
      )}

      <div className="w-full h-[1px] bg-slate-500"></div>
    </>
  );
};

export default MenuItemCard;
