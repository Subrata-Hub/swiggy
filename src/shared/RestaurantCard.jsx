/* eslint-disable react/display-name */
import { Link } from "react-router-dom";
import { IMG_CARD_URL_2 } from "../utils/constant";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const RestaurantCard = ({ topRes }) => {
  const placeData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );
  const placeArray = placeData?.address_components?.filter((cityList) =>
    cityList?.types?.find((item) => item === "city")
  );

  const city = placeArray?.[0]?.long_name;
  console.log(city);

  return (
    <Link
      to={`/city/${city}/${topRes?.name}/${topRes?.locality}/${topRes?.id}`}
    >
      <div className="mb-4 relative">
        <div className="w-[283px] h-[182px] relative">
          <img
            src={IMG_CARD_URL_2 + topRes?.cloudinaryImageId}
            alt={topRes?.name}
            className="w-[283px] h-[182px] object-cover rounded-xl"
          />
          <div className="absolute w-full text-left px-[12px] pb-2 h-[81px] bg-gradient-to-t from-[rgb(27,30,36)] to-[rgba(27,30,36,0)] bottom-0"></div>
        </div>
        <h2 className="mt-3 ml-2 font-semibold text-xl truncate max-w-[275px]">
          {topRes?.name}
        </h2>
        <div className="ml-2">
          <span className="font-mono">
            {" "}
            ❇️{topRes?.avgRatingString} {". "}
          </span>

          <span>{topRes?.sla?.slaString}</span>
        </div>
        <p className="ml-2 mt-1 truncate max-w-[275px]">
          {topRes?.cuisines?.join(", ")}
        </p>
        <p className="ml-2 truncate max-w-[275px]">{topRes?.locality}</p>
      </div>
    </Link>
  );
};

// export default RestaurantCard;

const RestaurantCardWithOffer = (RestaurantCard) => {
  return ({ topRes, offer }) => (
    <div className="flex flex-col relative">
      <RestaurantCard topRes={topRes} />
      <div className="absolute bottom-[140px] px-3 w-full">
        {offer && (
          <div className="flex font-bold text-[18px]">
            <h1>{offer?.header}</h1> <p className="ml-2"> {offer?.subHeader}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const EnhancedRestaurantCard = RestaurantCardWithOffer(RestaurantCard);
