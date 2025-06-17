import { Link, useNavigate, useParams } from "react-router-dom";

import useRestaurantsDetails from "../hooks/useRestaurantsDetails";
import RestaurantsInfo from "../components/RestaurantsInfo";
import OfferCard from "../shared/OfferCard";
import Menu from "../components/Menu";
import { useState } from "react";
import RestaurantDetailShimmer from "../shared/shimmer/RestaurantDetailShimmer";
import PopupCardView from "../shared/PopupCardView";
import { useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";

const RestaurantDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const { restaurantId, areaName, restaurantName, location } = useParams();
  const navigate = useNavigate();
  // localStorage.removeItem("recent_Search");

  const currentLocation = JSON.parse(localStorage.getItem("current_location"));
  console.log(currentLocation);

  const latlang = useSelector(
    (store) => store?.firebaseData?.userLocationData?.latlng
  );

  // const placeData = useSelector(
  //   (store) => store?.firebaseData?.userLocationData
  // );
  // const placeArray = placeData
  //   ? placeData
  //   : currentLocation?.address_components?.filter((cityList) =>
  //       cityList?.types?.find((item) => item === "city")
  //     );

  // const city = placeArray?.[0]?.long_name;

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
    menuURL: `/city/${location}/${restaurantName}/${areaName}/${restaurantId}`,
  };

  const goToPreviousPage = () => {
    navigate(history.back());
  };
  return (
    <div className="flex flex-col mt-24 mx-2 xs:mx-[30px]  sm:mx-[50px] md:mx-[60px] lg:mx-[120px] xl:mx-[180px] 2xl:mx-[340px]">
      <div className="flex sm:hidden">
        <HiArrowLeft className="text-xl" onClick={goToPreviousPage} />
      </div>
      <div className="hidden sm:flex text-sm">
        <span>
          <Link to={"/"}>Home</Link>
        </span>
        /<span className="text-slate-300">{location}</span>/
        <span className="text-slate-300">{restaurantName}</span>
      </div>
      <div className="mt-5 sm:mt-10">
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
                resDetailsData?.[window.innerWidth > 640 ? 4 : 5]?.groupedCard
                  ?.cardGroupMap?.REGULAR?.cards
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
    </div>
  );
};

export default RestaurantDetailsPage;
