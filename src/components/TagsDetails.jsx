/* eslint-disable react/prop-types */
import RestaurantCard from "../shared/RestaurantCard";

const TagsDetails = ({ restaurantList }) => {
  return (
    <div className="flex flex-wrap gap-8 mt-8">
      {restaurantList?.map((restaurant) => (
        <RestaurantCard
          topRes={restaurant?.card?.card?.info}
          key={restaurant?.card?.card?.info?.id}
        />
      ))}
    </div>
  );
};

export default TagsDetails;
