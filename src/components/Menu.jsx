/* eslint-disable react/prop-types */

import { useState } from "react";
import MenuItemFilter from "./filter/MenuItemFilter";
import MenuCategoryList from "./MenuCategoryList";
import menuLeft from "../assets/menuLeft.svg";
import menuRight from "../assets/menuRight.svg";

// import { HiMagnifyingGlass } from "react-icons/hi2";
// import { Link } from "react-router-dom";

import MenuSearchClick from "./MenuSearchClick";

const Menu = ({
  resDetailsData,
  restaurantId,
  areaName,
  restaurantName,
  location,
  resInformation,
}) => {
  const [filterOption, setFilterOption] = useState("All");
  const [activeOption, setActiveOption] = useState("All");

  // // Use useEffect to update the URL when the query changes

  const setOption = (value) => {
    setFilterOption(value);
    setActiveOption(value);
  };

  const resMenuData = resDetailsData?.filter(
    (item) =>
      item?.card?.card?.["@type"] !==
      "type.googleapis.com/swiggy.presentation.food.v2.MenuVegFilterAndBadge"
  );

  // const resMenuDataWithNestedItem = resDetailsData?.filter(
  //   (item) =>
  //     item?.card?.card?.["@type"] ===
  //     "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  // );

  // const searchFill = searchData?.filter((itemFill) => itemFill?.)

  return (
    <div className="mt-15 mx-48">
      <div className="flex justify-center items-center">
        <div className="flex text-center">
          <img src={menuLeft} />
          <h2>Menu</h2>
          <img src={menuRight} />
        </div>
      </div>

      <MenuSearchClick
        restaurantId={restaurantId}
        areaName={areaName}
        restaurantName={restaurantName}
        location={location}
      />
      <MenuItemFilter setOption={setOption} activeOption={activeOption} />
      <MenuCategoryList
        resMenuData={resMenuData}
        filterOption={filterOption}
        resInformation={resInformation}
      />
    </div>
  );
};

export default Menu;
