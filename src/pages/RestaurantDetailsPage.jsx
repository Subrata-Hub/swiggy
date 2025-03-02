import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useRestaurantsDetails from "../hooks/useRestaurantsDetails";
import RestaurantsInfo from "../components/RestaurantsInfo";
import OfferCard from "../shared/OfferCard";
import Menu from "../components/Menu";
import { useState } from "react";
import RestaurantDetailShimmer from "../shared/shimmer/RestaurantDetailShimmer";

const RestaurantDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const { restaurantId, areaName, restaurantName, location } = useParams();

  const resDetailsData = useRestaurantsDetails(restaurantId, setLoading);
  // if (!resDetailsData && resDetailsData.length === 0 && loading)
  //   <RestaurantDetailShimmer />;
  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      {loading && resDetailsData.length === 0 ? (
        <RestaurantDetailShimmer />
      ) : (
        <>
          <RestaurantsInfo resDetailsData={resDetailsData} />
          <OfferCard
            resDetailsData={
              resDetailsData?.[3]?.card?.card?.gridElements?.infoWithStyle
                ?.offers
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
        </>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
