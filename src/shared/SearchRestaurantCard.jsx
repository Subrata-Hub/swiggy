/* eslint-disable react/display-name */
import { Link } from "react-router-dom";
import { IMG_SEARCH_RES } from "../utils/constant";

/* eslint-disable react/prop-types */
const SearchRestaurantCard = ({ searchResData }) => {
  return (
    <div className="bg-slate-800 w-[423px] h-[156px] mb-2">
      <Link
        to={`/city/kolkata/${searchResData?.name}/${searchResData?.areaName}/${searchResData?.id}`}
      >
        <div className="flex gap-4 items-center px-4 py-6">
          <div className="w-[88px] h-[96px] relative items-center">
            <img
              src={IMG_SEARCH_RES + searchResData?.cloudinaryImageId}
              className="w-[88px] h-[96px] object-cover rounded-2xl"
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
