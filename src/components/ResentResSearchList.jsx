import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSearchActionType,
  addSearchResultType,
  addSuggestionText,
} from "../utils/configSlice";
import { useState } from "react";

/* eslint-disable react/prop-types */
const ResentResSearchList = ({
  suggestionText,
  searchQueryInput,

  setSearchQueryInput,
  setShowSuggestion,
}) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSearch = JSON.parse(localStorage.getItem("recent_Search"));
  const recentResSearchArray = JSON.parse(localStorage.getItem("resItems"));
  console.log(recentResSearchArray);
  const recentResSearchUniqueArray = [
    ...new Set(recentResSearchArray?.items),
  ].slice(0, 6);
  console.log(recentResSearchUniqueArray);

  const renserRecentResSearch =
    recentResSearchUniqueArray?.length > 0 && !showMore
      ? recentResSearchUniqueArray.slice(0, 3)
      : window.innerWidth < 680
      ? recentResSearchUniqueArray.slice(0, 4)
      : recentResSearchUniqueArray;

  console.log(window.innerWidth);
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

  const handaleShowMore = () => {
    if (recentResSearchUniqueArray.length > 3) {
      setShowMore(true);
    }
  };

  return (
    (!suggestionText || !searchQueryInput) &&
    !currentSearch && (
      <>
        {recentResSearchUniqueArray?.length > 0 ? (
          <div className="px-3 sm:px-4 ">
            <div className="flex justify-between">
              <h2>Resent Searches</h2>
              <p
                className="text-orange-400 cursor-pointer"
                onClick={handaleShowMore}
              >
                {!showMore ? "Show More" : ""}
              </p>
            </div>

            <div className="mt-4">
              {recentResSearchUniqueArray?.length > 0 &&
                renserRecentResSearch?.map((recentResSearch, index) => (
                  <>
                    <div
                      key={index}
                      className="flex gap-4 cursor-pointer items-center"
                      onClick={() => goToQueryPage(recentResSearch)}
                    >
                      <HiOutlineSearch className="text-xl" />
                      <p>{recentResSearch}</p>
                    </div>
                    <div className="w-full bg-gray-500 h-[0.5px] my-4"></div>
                  </>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    )
  );
};

export default ResentResSearchList;
