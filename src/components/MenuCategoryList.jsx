/* eslint-disable react/prop-types */

import MenuItemCard from "../shared/MenuItemCard";

const MenuCategoryList = ({ resMenuData, filterOption }) => {
  console.log(resMenuData);

  return (
    <div className="mt-6">
      {resMenuData?.map((resMenu, index) => (
        <MenuItemCard
          resMenu={resMenu?.card?.card}
          filterOption={filterOption}
          key={index}
        />
      ))}
    </div>
  );
};

export default MenuCategoryList;
