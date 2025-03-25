import { EnhancedRestaurantCard } from "../shared/RestaurantCard";

/* eslint-disable react/prop-types */
const TopRestaurants = ({ topResData }) => {
  console.log(topResData);

  const topRestaurantsHeader = topResData?.[0]?.card?.card?.header?.title;
  const topRestaurants =
    topResData?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  return (
    <>
      <div className="mt-10">
        <h1 className="text-[22px] font-semibold">{topRestaurantsHeader}</h1>
        <div className="flex w-full overflow-x-auto hide-scrollbar mt-4">
          <div className="flex gap-8">
            {topRestaurants?.map((topRes) => (
              <EnhancedRestaurantCard
                topRes={topRes?.info}
                key={topRes?.info?.id}
                offer={topRes?.info?.aggregatedDiscountInfoV3}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-700 mt-13"></div>
    </>
  );
};

export default TopRestaurants;
