import { EnhancedRestaurantCard } from "../shared/RestaurantCard";

/* eslint-disable react/prop-types */
const TopRestaurants = ({ topResData, city }) => {
  const topRestaurantsHeader = topResData?.[0]?.card?.card?.header?.title;
  const topRestaurants =
    topResData?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  return (
    <>
      <div
        className={`${topRestaurantsHeader ? "mt-3 sm:mt-10" : "mt-0"} ml-2`}
      >
        <h1 className="text-[22px] font-semibold">{topRestaurantsHeader}</h1>
        <div className="flex w-full overflow-x-auto hide-scrollbar mt-4">
          <div className="flex justify-center xl:justify-start gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6">
            {topRestaurants?.map((topRes) => (
              <EnhancedRestaurantCard
                topRes={topRes?.info}
                key={topRes?.info?.id}
                offer={topRes?.info?.aggregatedDiscountInfoV3}
                city={city}
              />
            ))}
          </div>
        </div>
      </div>
      {topRestaurants && (
        <div className="w-full h-[1px] bg-slate-700 mt-5 sm:mt-13"></div>
      )}
    </>
  );
};

export default TopRestaurants;
