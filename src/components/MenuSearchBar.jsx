/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiArrowLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addSearchQuery } from "../utils/searchSlice";
import { Link } from "react-router-dom";
const MenuSearchBar = ({
  restaurantName,
  restaurantId,
  location,
  areaName,
}) => {
  console.log(location, areaName, restaurantName, restaurantId);
  const [query, setQuery] = useState("");

  const searchQuery = useSelector((store) => store.search.searchQuery);

  const dispatch = useDispatch();

  const getQuery = (q) => {
    setQuery(q);
    dispatch(addSearchQuery(q));
  };

  console.log("Local State:", query);
  console.log("Redux Store:", searchQuery); // Check if Redux is updating
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
