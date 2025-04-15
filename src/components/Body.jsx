import { useState } from "react";
import useRestaurants from "../hooks/useRestaurants";
import ImageInfoLayout from "./ImageInfoLayout";
import Restaurants from "./Restaurants";
import TopRestaurants from "./TopRestaurants";
import RestaurantsShimmer from "../shared/shimmer/RestaurantsShimmer";
import { useSelector } from "react-redux";
import LocationUnAvailable from "./LocationUnAvailable";
import useUserFromDB from "../hooks/useUserFromDB";
import useLocationFromDB from "../hooks/useLocationFromDB";

const Body = () => {
  const [loading, setLoading] = useState(true);

  const userData = useUserFromDB();

  const latlng = useSelector((store) => store?.location?.latlng);

  const currentLocation = JSON.parse(localStorage.getItem("current_location"));

  const currentLocationId = useSelector(
    (store) => store.firebaseData?.userLocationData?.currentLocId
  );

  const userLocationData = useLocationFromDB(
    (currentLocationId !== null && currentLocationId) || currentLocation?.id,
    setLoading
  );

  const LAT =
    userLocationData?.latlng !== undefined && userLocationData?.latlng?.LAT
      ? userLocationData?.latlng?.LAT
      : latlng?.LAT;

  const LNG =
    userLocationData?.latlng !== undefined && userLocationData?.latlng?.LNG
      ? userLocationData?.latlng?.LNG
      : latlng?.LNG;

  console.log(LAT, LNG);

  const resData = useRestaurants(setLoading, LAT, LNG);

  const resDataForTopRestaurants = resData?.filter(
    (item) => item?.card?.card?.id === "top_brands_for_you"
  );

  const swiggyNotPresent = resData?.filter(
    (item) => item?.card?.card?.id === "swiggy_not_present"
  );

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
              <ImageInfoLayout resData={resData} userData={userData} />
              <TopRestaurants topResData={resDataForTopRestaurants} />
              <Restaurants
                allResData={resData}
                userLocationData={
                  userLocationData !== undefined && userLocationData
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Body;
