import { EnhancedRestaurantCard } from "../shared/RestaurantCard";

/* eslint-disable react/prop-types */
const TopRestaurants = ({ topResData }) => {
  const topRestaurants = topResData?.[1]?.card?.card;

  return (
    <div className="mt-2">
      <h1 className="text-xl font-semibold">{topRestaurants?.header?.title}</h1>
      <div className="flex w-full overflow-x-auto hide-scrollbar mt-4">
        <div className="flex gap-8">
          {topRestaurants?.gridElements?.infoWithStyle?.restaurants?.map(
            (topRes) => (
              <EnhancedRestaurantCard
                topRes={topRes?.info}
                key={topRes?.info?.id}
                offer={topRes?.info?.aggregatedDiscountInfoV3}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRestaurants;
