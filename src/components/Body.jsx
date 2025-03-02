import { useState } from "react";
import useRestaurants from "../hooks/useRestaurants";
import ImageInfoLayout from "./ImageInfoLayout";
import Restaurants from "./Restaurants";
import TopRestaurants from "./TopRestaurants";
import RestaurantsShimmer from "../shared/shimmer/RestaurantsShimmer";

const Body = () => {
  const [loading, setLoading] = useState(true);
  const resData = useRestaurants(setLoading);

  return (
    <div className="">
      {loading && resData.length === 0 ? (
        <RestaurantsShimmer />
      ) : (
        <>
          <ImageInfoLayout resData={resData} />
          <TopRestaurants topResData={resData} />
          <Restaurants allResData={resData} />
        </>
      )}
    </div>
  );
};

export default Body;
