import RestaurantCard from "../shared/RestaurantCard";

/* eslint-disable react/prop-types */
const TopRestaurants = ({ topResData }) => {
  const topRestaurants = topResData?.[1]?.card?.card;
  console.log(topRestaurants?.gridElements?.infoWithStyle?.restaurants);
  return (
    <div className="mt-2">
      <h1 className="text-xl font-semibold">{topRestaurants?.header?.title}</h1>
      <div className="flex w-full overflow-x-auto hide-scrollbar mt-4">
        <div className="flex gap-8">
          {topRestaurants?.gridElements?.infoWithStyle?.restaurants?.map(
            (topRes) => (
              <RestaurantCard topRes={topRes?.info} key={topRes?.info?.id} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRestaurants;
