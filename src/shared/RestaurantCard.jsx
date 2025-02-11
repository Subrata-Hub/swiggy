import { Link } from "react-router-dom";
import { IMG_CARD_URL_2 } from "../utils/constant";

/* eslint-disable react/prop-types */
const RestaurantCard = ({ topRes }) => {
  return (
    <Link
      to={`/city/kolkata/${topRes?.name}/${topRes?.locality}/${topRes?.id}`}
    >
      <div className="mb-4">
        <div className="w-[283px] h-[182px] flex">
          <img
            src={IMG_CARD_URL_2 + topRes?.cloudinaryImageId}
            alt={topRes?.name}
            className="w-[283px] h-[182px] object-cover rounded-xl"
          />
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

export default RestaurantCard;
