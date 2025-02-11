import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useRestaurantsDetails from "../hooks/useRestaurantsDetails";
import RestaurantsInfo from "../components/RestaurantsInfo";
import OfferCard from "../shared/OfferCard";

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();
  const resDetailsData = useRestaurantsDetails(restaurantId);
  console.log(resDetailsData);
  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      <RestaurantsInfo resDetailsData={resDetailsData} />
      <OfferCard
        resDetailsData={
          resDetailsData?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers
        }
      />
    </div>
  );
};

export default RestaurantDetailsPage;
