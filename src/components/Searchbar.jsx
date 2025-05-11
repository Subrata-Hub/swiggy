/* eslint-disable react/prop-types */

import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch } from "react-redux";

import { addSearchActionType, addSuggestionText } from "../utils/configSlice";
import { useLocation } from "react-router-dom";

const Searchbar = ({
  setShowSuggestion,
  setSearchQueryInput,
  searchQueryInput,
}) => {
  const location = useLocation();

  const dispatch = useDispatch();
  const pathname = location.pathname;

  console.log(pathname);

  const getSearchQuery = (query) => {
    setSearchQueryInput(query);

    dispatch(addSearchActionType("SUGGESTION"));

    setShowSuggestion(true);
  };

  const handleClick = (value) => {
    setSearchQueryInput(value);
    dispatch(addSuggestionText(value));
    dispatch(addSearchActionType("ENTER"));
    setShowSuggestion(false);
  };

  return (
    <div className="mt-4 flex items-center px-36 relative">
      <input
        type="search"
        value={searchQueryInput}
        placeholder={`Search for restaurant and food`}
        className="pl-6 w-full h-12 bg-slate-800 outline-none"
        onChange={(e) => getSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick(e.target.value);
          }
        }}
      />
      {<HiMagnifyingGlass className="-ml-8" />}
    </div>
  );
};

export default Searchbar;
