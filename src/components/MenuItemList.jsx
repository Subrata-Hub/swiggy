/* eslint-disable react/prop-types */
import { HiChevronUp } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi2";

import { useDispatch } from "react-redux";
import { addMenuItems } from "../utils/menuItemSlice";

import MenuItemCard from "../shared/MenuItemCard";
import { useState } from "react";

const MenuItemList = ({ resMenu, filterOption, resInformation }) => {
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
        <div
          className={`flex justify-between items-center py-4 category category--${resMenu?.categoryId}`}
          // data-categoryid={`${resMenu?.categoryId}`}
          // id={resMenu?.categoryId}
        >
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
                <MenuItemCard
                  resMenuItem={resMenuItem}
                  resInformation={resInformation}
                />

                <div className="w-full h-[1px] bg-slate-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuItemList;
