/* eslint-disable react/prop-types */

import MenuItemCard from "../shared/MenuItemCard";

const MenuCategoryList = ({ resMenuData }) => {
  console.log(resMenuData);
  return (
    <div className="mt-6">
      {resMenuData?.map((resMenu, index) => (
        <MenuItemCard resMenu={resMenu?.card?.card} key={index} />
      ))}
    </div>
  );
};

export default MenuCategoryList;
