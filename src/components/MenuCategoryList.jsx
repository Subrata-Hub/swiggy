/* eslint-disable react/prop-types */

import MenuItemList from "./MenuItemList";

const MenuCategoryList = ({ resMenuData, filterOption }) => {
  return (
    <div className="mt-6">
      {resMenuData?.map((resMenu, index) => (
        <MenuItemList
          resMenu={resMenu?.card?.card}
          filterOption={filterOption}
          key={index}
        />
      ))}
    </div>
  );
};

export default MenuCategoryList;
