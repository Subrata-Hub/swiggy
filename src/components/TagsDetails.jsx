/* eslint-disable react/prop-types */

import { EnhancedRestaurantCard } from "../shared/RestaurantCard";

// import RestaurantCard from "../shared/RestaurantCard";

const TagsDetails = ({ restaurantList }) => {
  return (
    <div className="flex flex-wrap gap-8 mt-8">
      {restaurantList?.map((restaurant) => (
        <EnhancedRestaurantCard
          topRes={restaurant?.card?.card?.info}
          key={restaurant?.card?.card?.info?.id}
          offer={restaurant?.card?.card?.info?.aggregatedDiscountInfoV3}
        />
      ))}
    </div>
  );
};

export default TagsDetails;
