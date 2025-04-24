import { useSelector } from "react-redux";
import { EnhancedRestaurantCard } from "../shared/RestaurantCard";

/* eslint-disable react/prop-types */
const TopRestaurants = ({ topResData }) => {
  const placeData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );
  const placeArray = placeData?.address_components?.filter((cityList) =>
    cityList?.types?.find((item) => item === "city")
  );

  const city = placeArray?.[0]?.long_name;
  console.log(city);
  const topRestaurantsHeader = topResData?.[0]?.card?.card?.header?.title;
  const topRestaurants =
    topResData?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  return (
    <>
      <div className={`${topRestaurantsHeader ? "mt-10" : "mt-0"}`}>
        <h1 className="text-[22px] font-semibold">{topRestaurantsHeader}</h1>
        <div className="flex w-full overflow-x-auto hide-scrollbar mt-4">
          <div className="flex gap-8">
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
        <div className="w-full h-[1px] bg-slate-700 mt-13"></div>
      )}
    </>
  );
};

export default TopRestaurants;
