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

  const currentLocation = JSON.parse(localStorage.getItem("current_location"));
  console.log(currentLocation);

  const latlang = useSelector(
    (store) => store?.firebaseData?.userLocationData?.latlng
  );

  const placeData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );
  const placeArray = placeData
    ? placeData
    : currentLocation?.address_components?.filter((cityList) =>
        cityList?.types?.find((item) => item === "city")
      );

  const city = placeArray?.[0]?.long_name;

  const LAT = latlang?.LAT ? latlang?.LAT : currentLocation?.latlng?.LAT;
  const LNG = latlang?.LNG ? latlang?.LNG : currentLocation?.latlng?.LNG;

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
    menuURL: `/city/${city}/${restaurantName}/${areaName}/${restaurantId}`,
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
