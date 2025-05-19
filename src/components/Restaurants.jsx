// import RestaurantCard from "../shared/RestaurantCard";

import { EnhancedRestaurantCard } from "../shared/RestaurantCard";

/* eslint-disable react/prop-types */
const Restaurants = ({ allResData, userLocationData, city }) => {
  const resDataForRestaurantsTitle = allResData?.filter(
    (item) => item?.card?.card?.id === "popular_restaurants_title"
  );

  const resDataForRestaurants = allResData?.filter(
    (item) => item?.card?.card?.id === "restaurant_grid_listing_v2"
  );
  const title = resDataForRestaurantsTitle?.[0]?.card?.card?.title;
  const allRestaurants =
    resDataForRestaurants?.[0]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants;

  return (
    <div className="mt-4 sm:mt-6">
      <h1 className="text-[17px] mx-2 sm:text-[25px] font-bold">{title}</h1>
      <div className="w-full flex justify-center  flex-wrap gap-4 sm:gap-2.5 md:gap-6 lg:gap-6 xl:gap-6 mt-6">
        {allRestaurants?.map((restaurant) => (
          <EnhancedRestaurantCard
            topRes={restaurant?.info}
            key={restaurant?.info?.id}
            offer={restaurant?.info?.aggregatedDiscountInfoV3}
            userLocationData={userLocationData}
            city={city}
          />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
