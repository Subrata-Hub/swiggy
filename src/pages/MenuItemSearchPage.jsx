import { useParams } from "react-router-dom";
import MenuSearchBar from "../components/MenuSearchBar";
import Navbar from "../components/Navbar";

import { useSelector } from "react-redux";
// import MenuItemCard from "../shared/MenuItemCard";
import SearchMenuItemCard from "../shared/SearchMenuItemCard";

const MenuItemSearchPage = () => {
  const { restaurantName, restaurantId, location, areaName } = useParams();
  // console.log(location, areaName, restaurantName, restaurantId);

  const query = useSelector((store) => store?.search?.searchQuery);
  const menuItemsList = useSelector((store) => store?.menuItem?.menuItems);
  console.log(menuItemsList);
  console.log(query, restaurantId);

  let menuItemsListFilter;
  if (query) {
    menuItemsListFilter = menuItemsList?.filter((item) =>
      item?.card?.info?.name.toLowerCase()?.includes(query.toLowerCase())
    );
  } else {
    menuItemsList;
  }

  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      <MenuSearchBar
        restaurantName={restaurantName}
        restaurantId={restaurantId}
        location={location}
        areaName={areaName}
      />
      <SearchMenuItemCard menuItemsListFilter={menuItemsListFilter} />
    </div>
  );
};

export default MenuItemSearchPage;
