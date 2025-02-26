/* eslint-disable react/prop-types */
import { HiArrowSmallRight } from "react-icons/hi2";
import { IMG_SEARCH_DISH } from "../utils/constant";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { Link } from "react-router-dom";
const SearchDishesCard = ({ searchDishesData }) => {
  return (
    <div className="bg-slate-800 w-[438px] h-[275px] mb-2">
      <div className="flex-col">
        <div className="">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex-col">
              <p className="text-[15px] font-semibold">
                {searchDishesData?.restaurant?.info?.name}
              </p>
              <div className="text-[12px] mt-2 font-extralight">
                <span>
                  ❇️{searchDishesData?.restaurant?.info?.avgRatingString} .{" "}
                  {searchDishesData?.restaurant?.info?.sla?.slaString}
                </span>
              </div>
            </div>

            <div>
              <Link
                to={`/city/kolkata/${searchDishesData?.restaurant?.info?.name}/${searchDishesData?.restaurant?.info?.areaName}/${searchDishesData?.restaurant?.info?.id}`}
              >
                <HiArrowSmallRight className="text-2xl" />
              </Link>
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-700 mt-3"></div>
        </div>
        <div className="flex justify-between  items-center py-4 px-3">
          <div className="flex-col w-1/2">
            {searchDishesData?.info?.isVeg === 1 ? (
              <img src={veg} />
            ) : (
              <img src={nonVeg} />
            )}
            <h2 className="text-[19px] font-semibold line-clamp-2">
              {searchDishesData?.info?.name}
            </h2>
            <p>
              ₹
              {searchDishesData?.info?.price
                ? searchDishesData?.info?.price / 100
                : searchDishesData?.info?.efaultPrice / 100}
            </p>
            <button className="px-4 py-2 rounded-2xl text-xs bg-slate-700 mt-4">
              More Details
            </button>
          </div>
          <div className="w-[156px] h-[144px]">
            <img
              src={IMG_SEARCH_DISH + searchDishesData?.info?.imageId}
              className="w-[156px] h-[144px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDishesCard;
