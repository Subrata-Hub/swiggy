import { useState } from "react";
import useRestaurants from "../hooks/useRestaurants";
import ImageInfoLayout from "./ImageInfoLayout";
import Restaurants from "./Restaurants";
import TopRestaurants from "./TopRestaurants";
import RestaurantsShimmer from "../shared/shimmer/RestaurantsShimmer";
import { useSelector } from "react-redux";
import LocationUnAvailable from "./LocationUnAvailable";

const Body = () => {
  const [loading, setLoading] = useState(true);

  const latlang = useSelector((store) => store?.location?.latlng);

  const LAT = latlang?.LAT;
  const LNG = latlang?.LNG;

  const resData = useRestaurants(setLoading, LAT, LNG);

  const resDataForTopRestaurants = resData?.filter(
    (item) => item?.card?.card?.id === "top_brands_for_you"
  );

  const swiggyNotPresent = resData?.filter(
    (item) => item?.card?.card?.id === "swiggy_not_present"
  );
  console.log(swiggyNotPresent);

  return (
    <div className="">
      {loading || resData?.length === 0 || resData === undefined ? (
        <RestaurantsShimmer />
      ) : (
        <>
          {swiggyNotPresent?.length !== 0 ? (
            <LocationUnAvailable swiggyNotPresent={swiggyNotPresent} />
          ) : (
            <>
              <ImageInfoLayout resData={resData} />
              <TopRestaurants topResData={resDataForTopRestaurants} />
              <Restaurants allResData={resData} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Body;
