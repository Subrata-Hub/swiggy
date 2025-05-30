/* eslint-disable react/prop-types */

import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch } from "react-redux";

import { addSearchActionType, addSuggestionText } from "../utils/configSlice";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  const dispatch = useDispatch();
  const pathname = location.pathname;
  const navigate = useNavigate();

  console.log(pathname);

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
    <div className="fixed bg-slate-800 top-28 left-1/2 -translate-x-1/2 w-full sm:w-[600px] md:w-[710px] lg:w-[925px] xl:w-[980px] 2xl:w-[945px]  flex items-center z-[24524114] px-1 sm:px-0 border-2 border-slate-700">
      <input
        type="search"
        value={searchQueryInput}
        placeholder={`Search for restaurant and food`}
        // Removed 'fixed' from input, adjust width for internal padding
        className={`${
          showBackToSearchIcon ? "pl-14" : "pl-10"
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
        <HiMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-[22px]" />
      )}
      {!showSearchIcon && (
        <HiMiniXMark
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[28px]"
          onClick={handleRemoveText}
        />
      )}

      {showBackToSearchIcon && (
        <HiChevronLeft
          className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[27px]"
          onClick={backToSearchPage}
        />
      )}
    </div>
  );
};

export default Searchbar;
