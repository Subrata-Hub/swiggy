import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useRestaurantsDetails from "../hooks/useRestaurantsDetails";
import RestaurantsInfo from "../components/RestaurantsInfo";
import OfferCard from "../shared/OfferCard";
import Menu from "../components/Menu";

const RestaurantDetailsPage = () => {
  const { restaurantId, areaName, restaurantName, location } = useParams();

  const resDetailsData = useRestaurantsDetails(restaurantId);

  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      <RestaurantsInfo resDetailsData={resDetailsData} />
      <OfferCard
        resDetailsData={
          resDetailsData?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers
        }
      />
      <Menu
        resDetailsData={
          resDetailsData?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        }
        restaurantId={restaurantId}
        areaName={areaName}
        restaurantName={restaurantName}
        location={location}
      />
    </div>
  );
};

export default RestaurantDetailsPage;
