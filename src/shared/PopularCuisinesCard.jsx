import { useNavigate } from "react-router-dom";
import { IMG_POPULAR_CUSINESS } from "../utils/constant";
import { useDispatch } from "react-redux";

import { addSearchQuery } from "../utils/searchSlice";

/* eslint-disable react/prop-types */
const PopularCuisinesCard = ({ popularCuisines, setSearchQueryInput }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const link = popularCuisines?.action?.link;
  const match = link.match(/query=([^&]*)/);
  const query = match ? decodeURIComponent(match[1]) : null;
  console.log(query);

  const updateUrl = () => {
    navigate(`?query=${query}`);
    setSearchQueryInput(query);

    dispatch(addSearchQuery(query));
  };

  return (
    <div
      key={popularCuisines?.id}
      className="w-[80px] h-[80px] rounded-full flex-shrink-0"
      onClick={updateUrl}
    >
      <img
        src={IMG_POPULAR_CUSINESS + popularCuisines?.imageId}
        className="w-[80px] h-[80px] object-contain"
      />
    </div>
  );
};

export default PopularCuisinesCard;
