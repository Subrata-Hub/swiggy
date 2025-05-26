/* eslint-disable react/display-name */
import { Link } from "react-router-dom";
import { IMG_SEARCH_RES } from "../utils/constant";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const SearchRestaurantCard = ({ searchResData }) => {
  const placeData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );
  const placeArray = placeData?.address_components?.filter((cityList) =>
    cityList?.types?.find((item) => item === "city")
  );

  const city = placeArray?.[0]?.long_name;
  return (
    <div className="bg-slate-800 w-[380px] xs:w-[380px] sm:w-[280px] md:w-[320px] lg:w-[430px] xl:w-[450px] 2xl:w-[435px] h-[156px] mb-2">
      <Link
        to={`/city/${city}/${searchResData?.name}/${searchResData?.areaName}/${searchResData?.id}`}
      >
        <div className="flex gap-4 items-center px-4 py-6">
          <div className="w-[88px] h-[96px] relative items-center">
            <img
              src={IMG_SEARCH_RES + searchResData?.cloudinaryImageId}
              className="w-[88px] h-[96px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <div className="w-2/3">
            <h3 className="font-semibold">{searchResData?.name}</h3>
            <span className="text-[13px] font-light">
              ❇️{searchResData?.avgRating} . {searchResData?.costForTwo} .{" "}
              {searchResData?.sla?.slaString}
            </span>
            <p className="font-extralight text-[14px]">
              {searchResData?.cuisines?.join(", ")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const EnhanceSearchRestaurantCard = (SearchRestaurantCard) => {
  return ({ searchResData, offer, ad }) => (
    <div className="relative">
      <SearchRestaurantCard searchResData={searchResData} />
      {offer && (
        <div className="flex flex-col w-[70px] h-[36px] bg-white absolute bottom-10 ml-6 text-red-500 px-1 text-center">
          <div className="text-[15px] font-bold text-nowrap">
            {offer?.header}
          </div>
          <div className="text-[10px] text-nowrap">{offer?.subHeader}</div>

          {/* <p className="text-[12px] text-nowrap">{offer?.text}</p> */}
        </div>
      )}

      {ad && (
        <div className="absolute top-6 left-3 bg-gray-900 w-8 h-5 text-center text-[13px] font-bold">
          Ad
        </div>
      )}
    </div>
  );
};

export const SearchRestaurantCardWithOffer =
  EnhanceSearchRestaurantCard(SearchRestaurantCard);
