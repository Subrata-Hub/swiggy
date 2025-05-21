/* eslint-disable react/prop-types */

import { EnhancedRestaurantCard } from "../shared/RestaurantCard";

// import RestaurantCard from "../shared/RestaurantCard";

const TagsDetails = ({ restaurantList, city }) => {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-2.5 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-[25px] mt-8">
      {restaurantList?.map((restaurant) => (
        <EnhancedRestaurantCard
          topRes={restaurant?.card?.card?.info}
          key={restaurant?.card?.card?.info?.id}
          offer={restaurant?.card?.card?.info?.aggregatedDiscountInfoV3}
          city={city}
        />
      ))}
    </div>
  );
};

export default TagsDetails;
