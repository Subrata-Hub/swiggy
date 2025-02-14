/* eslint-disable react/prop-types */

import { useState } from "react";
import MenuItemFilter from "./filter/MenuItemFilter";
import MenuCategoryList from "./MenuCategoryList";
import MenuSearchBar from "./MenuSearchBar";

const Menu = ({ resDetailsData }) => {
  const [filterOption, setFilterOption] = useState("All");
  const [activeOption, setActiveOption] = useState("All");

  const setOption = (value) => {
    setFilterOption(value);
    setActiveOption(value);
  };

  console.log(filterOption);

  const resMenuData = resDetailsData?.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="mt-15 mx-48">
      <h2 className="text-center">Menu</h2>
      <MenuSearchBar />
      <MenuItemFilter setOption={setOption} activeOption={activeOption} />
      <MenuCategoryList resMenuData={resMenuData} filterOption={filterOption} />
    </div>
  );
};

export default Menu;
