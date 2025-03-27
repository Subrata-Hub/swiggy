/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiArrowLeft } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addMenuSearchQuery } from "../utils/menuSearchSlice";
import { Link } from "react-router-dom";
const MenuSearchBar = ({
  restaurantName,
  restaurantId,
  location,
  areaName,
}) => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const getQuery = (q) => {
    setQuery(q);
    dispatch(addMenuSearchQuery(q));
  };

  return (
    <div className="mt-4 flex items-center px-40 relative">
      <Link
        to={`/city/${location}/${restaurantName}/${areaName}/${restaurantId}`}
      >
        <HiArrowLeft className="absolute left-48 top-4" />
      </Link>
      <input
        type="search"
        value={query}
        placeholder={`Search in ${restaurantName}`}
        className="text-center w-full h-12 bg-slate-800 outline-none"
        onChange={(e) => getQuery(e.target.value)}
      />
      {!query && <HiMagnifyingGlass className="-ml-8" />}
    </div>
  );
};

export default MenuSearchBar;
