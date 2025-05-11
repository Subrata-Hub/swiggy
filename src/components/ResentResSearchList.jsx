import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSearchActionType,
  addSearchResultType,
  addSuggestionText,
} from "../utils/configSlice";

/* eslint-disable react/prop-types */
const ResentResSearchList = ({
  suggestionText,
  searchQueryInput,

  setSearchQueryInput,
  setShowSuggestion,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSearch = JSON.parse(localStorage.getItem("recent_Search"));
  const recentResSearchArray = JSON.parse(localStorage.getItem("resItems"));
  const recentResSearchUniqueArray = [...new Set(recentResSearchArray.items)];
  console.log(recentResSearchUniqueArray);

  const goToQueryPage = (query) => {
    navigate(`/search?query=${query}`);

    dispatch(addSuggestionText(query));

    dispatch(addSearchResultType("RESTAURANT"));

    dispatch(addSearchActionType("STORED_SEARCH"));

    localStorage.setItem(
      "recent_Search",
      JSON.stringify({
        suggestionText: query,
        searchResultType: "RESTAURANT",
      })
    );

    setSearchQueryInput(query);

    setShowSuggestion(false);
  };

  return (
    (!suggestionText || !searchQueryInput) &&
    !currentSearch && (
      <div className="px-40 pt-8">
        <div className="flex justify-between">
          <h2>Resent Searches</h2>
          <p>Show more</p>
        </div>

        <div className="mt-4">
          {recentResSearchUniqueArray.length > 0 &&
            recentResSearchUniqueArray?.map((recentResSearch, index) => (
              <>
                <div
                  key={index}
                  className="flex gap-2"
                  onClick={() => goToQueryPage(recentResSearch)}
                >
                  <HiOutlineSearch className="text-2xl" />
                  <p>{recentResSearch}</p>
                </div>
                <div className="w-full bg-gray-500 h-[0.5px] my-4"></div>
              </>
            ))}
        </div>
      </div>
    )
  );
};

export default ResentResSearchList;
