/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { IMG_SUGGESTION } from "../utils/constant";
import { useDispatch } from "react-redux";
import {
  addResItem,
  addSearchActionType,
  addSearchResultType,
  addSuggestionText,
} from "../utils/configSlice";

const SuggestionList = ({
  searchSuggestionsData,
  setShowSuggestion,
  showSuggestion,

  setShowAddToCardSearchResultsData,
  setSearchQueryInput,
  searchQueryInput,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSearch = JSON.parse(localStorage.getItem("recent_Search"));

  const searchSuggestions = searchSuggestionsData?.suggestions;

  function addResItemToLocalStorage(Item) {
    let resSearchArray;

    resSearchArray = getResSearchFromLocalStorage().items;
    // resSearchArray = getResSearchFromLocalStorage();

    resSearchArray?.push(Item);

    // localStorage.setItem("resItems", JSON.stringify({ items: resSearchArray }));
    localStorage.setItem("resItems", JSON.stringify({ items: resSearchArray }));
  }

  // function getResSearchFromLocalStorage() {
  //   let resSearchArray;

  //   if (localStorage.getItem("resItems") === undefined) {
  //     resSearchArray = {};
  //   } else {
  //     resSearchArray = JSON.parse(localStorage.getItem("resItems"));
  //   }

  //   return resSearchArray;
  // }

  function getResSearchFromLocalStorage() {
    const stored = localStorage.getItem("resItems");

    if (!stored) {
      return { items: [] }; // return default structure
    }

    try {
      const parsed = JSON.parse(stored);
      return parsed?.items ? parsed : { items: [] };
    } catch {
      return { items: [] };
    }
  }

  const goToQueryPage = (query, type) => {
    navigate(`/search?query=${query}`);
    localStorage.removeItem("recent_Search");

    dispatch(addSuggestionText(query));

    dispatch(addSearchResultType(type));

    dispatch(addSearchActionType("SUGGESTION"));

    localStorage.setItem(
      "recent_Search",
      JSON.stringify({
        suggestionText: query,
        searchResultType: type,
      })
    );

    if (type === "RESTAURANT") {
      dispatch(addResItem(query));
      addResItemToLocalStorage(query);
    }

    setSearchQueryInput(query);

    setShowSuggestion(false);

    setShowAddToCardSearchResultsData(false);
  };

  // px-40

  return (
    <div className="mt-6">
      {showSuggestion &&
        searchQueryInput !== "" &&
        searchQueryInput !== currentSearch?.suggestionText && (
          <div className="">
            {searchSuggestions?.map((sugest, index) => (
              <>
                <div className="hover:bg-slate-900 py-4 w-full">
                  <div
                    key={index}
                    className="flex gap-4"
                    onClick={() => goToQueryPage(sugest?.text, sugest?.type)}
                  >
                    <div className="w-[64px] h-[64px] rounded-2xl">
                      <img src={IMG_SUGGESTION + sugest?.cloudinaryId} />
                    </div>
                    <div className="flex-col">
                      <h2 className="font-semibold text-[17px]">
                        {sugest?.text}
                      </h2>
                      <p className="font-light">{sugest?.subCategory}</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
    </div>
  );
};

export default SuggestionList;
