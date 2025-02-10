import useRestaurants from "../hooks/useRestaurants";
import ImageInfoLayout from "./ImageInfoLayout";
import TopRestaurants from "./TopRestaurants";

const Body = () => {
  const resData = useRestaurants();

  return (
    <div>
      <ImageInfoLayout resData={resData} />
      <TopRestaurants topResData={resData} />
    </div>
  );
};

export default Body;
