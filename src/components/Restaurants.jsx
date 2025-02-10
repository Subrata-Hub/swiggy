import RestaurantCard from "../shared/RestaurantCard";

/* eslint-disable react/prop-types */
const Restaurants = ({ allResData }) => {
  const title = allResData?.[2]?.card?.card?.title;
  const allRestaurants =
    allResData?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  return (
    <div className="mt-6">
      <h1 className="text-2xl">{title}</h1>
      <div className="w-full flex flex-wrap gap-8 mt-6">
        {allRestaurants?.map((restaurant) => (
          <RestaurantCard topRes={restaurant.info} key={restaurant?.info?.id} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
