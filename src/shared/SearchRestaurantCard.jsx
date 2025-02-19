import { IMG_SEARCH_RES } from "../utils/constant";

/* eslint-disable react/prop-types */
const SearchRestaurantCard = ({ searchResData }) => {
  return (
    <div className="bg-slate-800 w-[423px] h-[156px] mb-2">
      <div className="flex gap-4 items-center px-4 py-6">
        <div className="w-[88px] h-[96px]">
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
            {searchResData?.cuisines.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchRestaurantCard;
