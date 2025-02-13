/* eslint-disable react/prop-types */

import MenuCategoryList from "./MenuCategoryList";
import MenuSearchBar from "./MenuSearchBar";

const Menu = ({ resDetailsData }) => {
  const resMenuData = resDetailsData?.slice(1);
  return (
    <div className="mt-15 mx-48">
      <h2 className="text-center">Menu</h2>
      <MenuSearchBar />
      <MenuCategoryList resMenuData={resMenuData} />
    </div>
  );
};

export default Menu;
