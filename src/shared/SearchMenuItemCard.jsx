import MenuItemCard from "./MenuItemCard";
/* eslint-disable react/prop-types */
const SearchMenuItemCard = ({ menuItemsListFilter, resInformation }) => {
  return (
    <div className="h-auto mt-4">
      {menuItemsListFilter?.map((resMenuItem) => (
        <div key={resMenuItem?.card?.info?.id}>
          <MenuItemCard
            resMenuItem={resMenuItem}
            resInformation={resInformation}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchMenuItemCard;
