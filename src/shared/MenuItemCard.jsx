/* eslint-disable react/prop-types */
import { HiChevronUp } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi2";
import { IMG_MENU } from "../utils/constant";
import { useState } from "react";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { useDispatch } from "react-redux";
import { addMenuItems } from "../utils/menuItemSlice";

const MenuItemCard = ({ resMenu, filterOption }) => {
  const [showMenu, setShowMenu] = useState(true);
  const dispatch = useDispatch();

  const searchFilter = resMenu?.itemCards;
  dispatch(addMenuItems(searchFilter));

  const allResMenuData = filterOption === "All" && resMenu?.itemCards;

  const resMenuWithFilterData = resMenu?.itemCards?.filter(
    (item) => item?.card?.info?.itemAttribute?.vegClassifier === filterOption
  );

  const bestSeller = resMenu?.itemCards?.filter(
    (item) =>
      item?.card?.info?.ratings?.aggregatedRating?.rating?.includes("4") ===
      filterOption?.includes("4")
  );

  const resMenuData =
    filterOption === "VEG" || filterOption === "NONVEG"
      ? resMenuWithFilterData
      : allResMenuData || bestSeller;

  const showAndHideMenu = () => {
    setShowMenu(!showMenu);
  };
  if (!resMenu?.title) return;

  return (
    <>
      <div className="w-full h-[1px] bg-slate-500"></div>
      <div className="flex-col">
        <div className="flex justify-between items-center py-4">
          <h1>
            {resMenu?.title}{" "}
            {resMenu?.itemCards?.length > 0 && (
              <span>({resMenu?.itemCards?.length})</span>
            )}
          </h1>
          {showMenu ? (
            <HiChevronDown
              className="text-xl font-semibold"
              onClick={showAndHideMenu}
            />
          ) : (
            <HiChevronUp
              className="text-xl font-semibold"
              onClick={showAndHideMenu}
            />
          )}
        </div>
        {showMenu && (
          <div className="h-auto mt-4">
            {resMenuData?.map((resMenuItem) => (
              <div key={resMenuItem?.card?.info?.id}>
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
                        {resMenuItem?.card?.info?.offerTags?.[0].title
                          ? " 🏷️"
                          : ""}
                        {resMenuItem?.card?.info?.offerTags?.[0].title}{" "}
                        {resMenuItem?.card?.info?.offerTags?.[0].subTitle}
                      </span>
                    </p>
                    {resMenuItem?.card?.info?.ratings?.aggregatedRating
                      ?.rating ? (
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
                  {resMenuItem?.card?.info?.imageId && (
                    <div className="w-[156px] h-[144px]">
                      <img
                        src={IMG_MENU + resMenuItem?.card?.info?.imageId}
                        className="object-cover w-[156px] h-[144px] rounded-2xl"
                      />
                    </div>
                  )}
                </div>

                <div className="w-full h-[1px] bg-slate-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuItemCard;
