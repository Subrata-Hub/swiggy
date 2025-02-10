import useRestaurants from "../hooks/useRestaurants";
import ImageInfoLayout from "./ImageInfoLayout";
import Restaurants from "./Restaurants";
import TopRestaurants from "./TopRestaurants";

const Body = () => {
  const resData = useRestaurants();

  return (
    <div>
      <ImageInfoLayout resData={resData} />
      <TopRestaurants topResData={resData} />
      <Restaurants allResData={resData} />
    </div>
  );
};

export default Body;
