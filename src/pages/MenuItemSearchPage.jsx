import { useParams } from "react-router-dom";
import MenuSearchBar from "../components/MenuSearchBar";

import { useSelector } from "react-redux";

import SearchMenuItemCard from "../shared/SearchMenuItemCard";
import { useEffect, useState } from "react";

const MenuItemSearchPage = () => {
  const { restaurantName, restaurantId, location, areaName } = useParams();
  const menuItemsList = useSelector((store) => store?.menuItem?.menuItems);
  const [menuItems, setMenuItems] = useState();

  const query = useSelector((store) => store?.menuSearch?.menuSearchQuery);
  const showNavigation = useSelector((store) => store.config.showNavigation);

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

  const resInformation = {
    restaurantId: restaurantId,
    restaurantName: restaurantName,
    resAreaName: areaName,
    // resImg: resDetailsData?.[2]?.card?.card?.info?.cloudinaryImageId,
    menuURL: `/city/${location}/${restaurantName}/${areaName}/${restaurantId}`,
  };

  return (
    <div
      className={`${
        showNavigation ? "mt-32" : "mt-10"
      } mx-2 xs:mx-[30px]  sm:mx-[50px] md:mx-[60px] lg:mx-[120px] xl:mx-[180px] 2xl:mx-[340px]`}
    >
      <MenuSearchBar
        restaurantName={restaurantName}
        restaurantId={restaurantId}
        location={location}
        areaName={areaName}
      />
      <SearchMenuItemCard
        menuItemsListFilter={menuItems}
        resInformation={resInformation}
      />
    </div>
  );
};

export default MenuItemSearchPage;
