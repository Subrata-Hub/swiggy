import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useRestaurantsDetails from "../hooks/useRestaurantsDetails";
import RestaurantsInfo from "../components/RestaurantsInfo";
import OfferCard from "../shared/OfferCard";
import Menu from "../components/Menu";
import { useState } from "react";
import RestaurantDetailShimmer from "../shared/shimmer/RestaurantDetailShimmer";
import PopupCardView from "../shared/PopupCardView";
import { useSelector } from "react-redux";

const RestaurantDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const { restaurantId, areaName, restaurantName, location } = useParams();

  const latlang = useSelector((store) => store?.location?.latlng);

  const LAT = latlang?.LAT;
  const LNG = latlang?.LNG;

  const resDetailsData = useRestaurantsDetails(
    restaurantId,
    setLoading,
    LAT,
    LNG
  );

  const resInformation = {
    restaurantId: restaurantId,
    restaurantName: restaurantName,
    resAreaName: areaName,
    resImg: resDetailsData?.[2]?.card?.card?.info?.cloudinaryImageId,
    menuURL: `/city/kolkata/${restaurantName}/${areaName}/${restaurantId}`,
  };
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
            resInformation={resInformation}
          />
          <PopupCardView />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
