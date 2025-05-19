/* eslint-disable react/display-name */
import { Link } from "react-router-dom";
import { IMG_CARD_URL_2 } from "../utils/constant";

/* eslint-disable react/prop-types */
const RestaurantCard = ({ topRes, city }) => {
  return (
    <Link
      to={`/city/${city}/${topRes?.name}/${topRes?.locality}/${topRes?.id}`}
    >
      <div className="mb-4 relative">
        <div className="w-[175px] sm:w-[180px] md:w-[180px] lg:w-[220px] xl:w-[227px] 2xl:w-[284px] h-[170px] sm:h-[182px] relative">
          <img
            src={IMG_CARD_URL_2 + topRes?.cloudinaryImageId}
            alt={topRes?.name}
            className="w-[175px] sm:w-[180px] md:w-[180px] lg:w-[220px] xl:w-[227px] 2xl:w-[284px] h-[170px] sm:h-[182px] object-cover rounded-xl"
          />
          <div className="absolute w-full text-left px-[12px] pb-2 h-[81px] bg-gradient-to-t from-[rgb(27,30,36)] to-[rgba(27,30,36,0)] bottom-0"></div>
        </div>
        <h2 className="mt-3 ml-0 sm:ml-2 font-semibold text-xl truncate max-w-[140px] sm:max-w-[170px] md:max-w-[170px] lg:max-w-[160px] xl:max-w-[210px] 2xl:max-w-[260px]">
          {topRes?.name}
        </h2>
        <div className="ml-0 sm:ml-2">
          <span className="font-mono">
            {" "}
            ❇️{topRes?.avgRatingString} {". "}
          </span>

          <span className="text-[14px] sm:text-[15px]">
            {topRes?.sla?.slaString}
          </span>
        </div>
        <p className="ml-0 sm:ml-2 mt-1 truncate max-w-[140px] sm:max-w-[170px] md:max-w-[170px] lg:max-w-[160px] xl:max-w-[210px] 2xl:max-w-[260px]">
          {topRes?.cuisines?.join(", ")}
        </p>
        <p className="ml-0 sm:ml-2 truncate max-w-[140px] sm:max-w-[170px] md:max-w-[170px] lg:max-w-[160px] xl:max-w-[210px] 2xl:max-w-[260px]">
          {topRes?.locality}
        </p>
      </div>
    </Link>
  );
};

// export default RestaurantCard;

const RestaurantCardWithOffer = (RestaurantCard) => {
  return ({ topRes, offer, city }) => (
    <div className="flex flex-col relative">
      <RestaurantCard topRes={topRes} city={city} />
      <div className="absolute  bottom-[150px]  px-3 w-full">
        {offer && (
          <div className="flex flex-col sm:flex-row font-bold">
            <div className=" text-[18px]">{offer?.header}</div>
            <div className=" ml-0 sm:ml-2 text-[10px] sm:text-[18px]">
              {" "}
              {offer?.subHeader}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const EnhancedRestaurantCard = RestaurantCardWithOffer(RestaurantCard);
