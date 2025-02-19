/* eslint-disable react/prop-types */

import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addSearchQuery } from "../utils/searchSlice";
const Searchbar = ({
  setShowSuggestion,
  setSearchQueryInput,
  searchQueryInput,
}) => {
  const dispatch = useDispatch();
  const getSearchQuery = (query) => {
    // setSearchQuery(query);
    setSearchQueryInput(query);
    dispatch(addSearchQuery(query));
    setShowSuggestion(true);
  };

  // console.log(searchQuery);
  return (
    <div className="mt-4 flex items-center px-40 relative">
      <input
        type="search"
        value={searchQueryInput}
        placeholder={`Search for restaurant and food`}
        className="pl-6 w-full h-12 bg-slate-800 outline-none"
        onChange={(e) => getSearchQuery(e.target.value)}
      />
      {<HiMagnifyingGlass className="-ml-8" />}
    </div>
  );
};

export default Searchbar;
