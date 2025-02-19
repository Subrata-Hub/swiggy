import { useParams } from "react-router-dom";
import MenuSearchBar from "../components/MenuSearchBar";
import Navbar from "../components/Navbar";

import { useSelector } from "react-redux";
// import MenuItemCard from "../shared/MenuItemCard";
import SearchMenuItemCard from "../shared/SearchMenuItemCard";
import { useEffect, useState } from "react";

const MenuItemSearchPage = () => {
  const { restaurantName, restaurantId, location, areaName } = useParams();
  const menuItemsList = useSelector((store) => store?.menuItem?.menuItems);
  const [menuItems, setMenuItems] = useState();
  // console.log(location, areaName, restaurantName, restaurantId);

  const query = useSelector((store) => store?.menuSearch?.menuSearchQuery);

  console.log(menuItemsList);
  console.log(query, restaurantId);

  useEffect(() => {
    if (!query) {
      setMenuItems(menuItemsList);
      return;
    }

    if (menuItemsList?.length) {
      setMenuItems(
        menuItemsList.filter((item) =>
          item?.card?.info?.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, menuItemsList]);

  // const getFilterData = (data, query) => {
  //   const menuItemsListFilter = data?.filter((item) =>
  //     item?.card?.info?.name.toLowerCase()?.includes(query.toLowerCase())
  //   );

  //   setMenuItems(menuItemsListFilter);
  // };

  // useEffect(() => {
  //   getFilterData(menuItemsList, query);
  // }, [query]);

  // let menuItemsListFilter;
  // if (query) {
  //   menuItemsListFilter = menuItemsList?.filter((item) =>
  //     item?.card?.info?.name.toLowerCase()?.includes(query.toLowerCase())
  //   );
  // }

  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      <MenuSearchBar
        restaurantName={restaurantName}
        restaurantId={restaurantId}
        location={location}
        areaName={areaName}
      />
      <SearchMenuItemCard menuItemsListFilter={menuItems} />
    </div>
  );
};

export default MenuItemSearchPage;
