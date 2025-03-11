/* eslint-disable react/prop-types */

import { HiMagnifyingGlass } from "react-icons/hi2";

import { Link } from "react-router-dom";

const MenuSearchClick = ({
  restaurantId,
  areaName,
  restaurantName,
  location,
}) => {
  return (
    <Link
      to={`/city/${location}/${restaurantName}/${areaName}/${restaurantId}/menuSearch`}
    >
      <div className="mt-4 flex  items-center">
        <div className="flex justify-center items-center mt-2 w-full h-12 bg-slate-800">
          Search For dishes
        </div>

        <HiMagnifyingGlass className="-ml-8" />
      </div>
    </Link>
  );
};

export default MenuSearchClick;
