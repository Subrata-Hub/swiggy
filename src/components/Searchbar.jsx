/* eslint-disable react/prop-types */

import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import {
  addSearchActionType,
  addShowNavigation,
  addSuggestionText,
} from "../utils/configSlice";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

const Searchbar = ({
  setShowSuggestion,
  setSearchQueryInput,
  searchQueryInput,

  showSearchIcon,
  setShowSearchIcon,
  showBackToSearchIcon,
  setShowBackToSearchIcon,
  showAddToCardSearchResultsData,
  setShowAddToCardSearchResultsData,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const showNavigation = useSelector((store) => store.config.showNavigation);

  const getSearchQuery = (query) => {
    setSearchQueryInput(query);
    dispatch(addSearchActionType("SUGGESTION"));
    setShowSuggestion(true);
    setShowSearchIcon(false);
  };

  const handleClick = (value) => {
    setSearchQueryInput(value);
    dispatch(addSuggestionText(value));
    dispatch(addSearchActionType("ENTER"));
    setShowSuggestion(false);
    setShowSearchIcon(false);
    if (window.innerWidth < 640) {
      dispatch(addShowNavigation(false));
    }
  };

  const backToSearchPage = () => {
    if (showAddToCardSearchResultsData) {
      setShowAddToCardSearchResultsData(false);
    } else {
      localStorage.removeItem("recent_Search");

      navigate("/search");

      setSearchQueryInput("");
      // dispatch(addSuggestionText(""));
      setShowSuggestion(true);
      setShowSearchIcon(true);
      setShowBackToSearchIcon(false);

      if (window.innerWidth < 640) {
        dispatch(addShowNavigation(false));
      }
    }
  };

  const handleRemoveText = () => {
    setSearchQueryInput("");
    setShowSuggestion(true);
    setShowSearchIcon(true);
    setShowBackToSearchIcon(true);
  };

  return (
    // Apply fixed positioning and z-index to the parent container
    <div
      className={`fixed bg-slate-800 ${
        showNavigation ? "top-28" : "top-6"
      } left-1/2 -translate-x-1/2 w-full sm:w-[600px] md:w-[710px] lg:w-[925px] xl:w-[980px] 2xl:w-[945px]  flex items-center z-[24524114] px-1 sm:px-0 border-2 border-slate-700`}
    >
      <input
        type="search"
        value={searchQueryInput}
        placeholder={`Search for restaurant and food`}
        // Removed 'fixed' from input, adjust width for internal padding
        className={`${
          showBackToSearchIcon ? "pl-8 sm:pl-14" : "pl-2 sm:pl-10"
        } w-full h-12 bg-slate-800 rounded-2xl sm:rounded-none outline-none pr-10`}
        onChange={(e) => getSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick(e.target.value);
          }
        }}
      />
      {/* Position the icon absolutely relative to its now fixed parent */}

      {showSearchIcon && (
        <HiMagnifyingGlass className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 text-[20px] sm:text-[22px]" />
      )}
      {!showSearchIcon && (
        <HiMiniXMark
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 text-[22px] sm:text-[28px]"
          onClick={handleRemoveText}
        />
      )}

      {showBackToSearchIcon && (
        <HiChevronLeft
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 font-semibold text-[24px] sm:text-[27px]"
          onClick={backToSearchPage}
        />
      )}
    </div>
  );
};

export default Searchbar;
