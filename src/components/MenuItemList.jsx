/* eslint-disable react/prop-types */
import { HiChevronUp } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi2";

import { useDispatch } from "react-redux";
import { addMenuItems } from "../utils/menuItemSlice";

import MenuItemCard from "../shared/MenuItemCard";
import { useState } from "react";

const MenuItemList = ({ resMenu, filterOption, resInformation }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState({});

  const dispatch = useDispatch();

  const searchFilter = resMenu?.itemCards;
  dispatch(addMenuItems(searchFilter));

  const allResMenuData =
    filterOption === "All" && (resMenu?.categories || resMenu?.itemCards);
  // const allResMenuDataWithNesIten =

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
  // if (!resMenu?.title) return;

  const showAndHideSubMenu = (categoryId) => {
    setShowSubMenu((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  return (
    <>
      <div className="w-full h-[18px] bg-gray-800"></div>
      <div className="flex-col">
        {resMenu?.itemCards ? (
          <div
            className={`flex justify-between items-center py-4 category category--${resMenu?.categoryId}`}
            // data-categoryid={`${resMenu?.categoryId}`}
            // id={resMenu?.categoryId}
          >
            <h1 className="font-bold text-[19px]">
              {resMenu?.title}{" "}
              {resMenu?.itemCards?.length > 0 && resMenu?.itemCards && (
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
        ) : (
          <>
            <div
              className={`flex justify-between items-center py-2 category category--${resMenu?.categoryId}`}
            ></div>
            <h1 className="font-bold text-[19px]">{resMenu?.title} </h1>
          </>
        )}

        {showMenu && (
          <div className="h-auto mt-4">
            {resMenu?.itemCards &&
              resMenuData?.map((resMenuItem) => (
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

        {resMenu?.categories &&
          resMenu?.categories?.map((subItem) => (
            <>
              <div className="flex-col mt-2" key={subItem?.categoryId}>
                <div className={`flex justify-between items-center`}>
                  <h2 className="font-semibold">
                    {subItem?.title}{" "}
                    {subItem?.itemCards?.length > 0 && subItem?.itemCards && (
                      <span>({subItem?.itemCards?.length})</span>
                    )}
                  </h2>
                  {showSubMenu[subItem?.categoryId] ? (
                    <HiChevronDown
                      className="text-xl font-semibold"
                      onClick={() => showAndHideSubMenu(subItem?.categoryId)}
                    />
                  ) : (
                    <HiChevronUp
                      className="text-xl font-semibold"
                      // onClick={showAndHideSubMenu}
                      onClick={() => showAndHideSubMenu(subItem?.categoryId)}
                    />
                  )}
                </div>

                <div className="w-full h-[0.3px] bg-slate-500 mt-6"></div>
              </div>
              {showSubMenu[subItem?.categoryId] &&
                subItem?.itemCards?.map((resMenuItem) => (
                  <>
                    <div key={resMenuItem?.card?.info?.id} className="">
                      <MenuItemCard
                        resMenuItem={resMenuItem}
                        resInformation={resInformation}
                      />
                    </div>
                  </>
                ))}
            </>
          ))}
      </div>
    </>
  );
};

export default MenuItemList;
