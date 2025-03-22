/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { IMG_SUGGESTION } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addSearchResultType, addSuggestionText } from "../utils/configSlice";

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

  const searchSuggestions = searchSuggestionsData?.suggestions;

  const goToQueryPage = (query, type) => {
    navigate(`/search?query=${query}`);
    dispatch(addSuggestionText(query));

    dispatch(addSearchResultType(type));

    setSearchQueryInput(query);
    setShowSuggestion(false);
    setShowAddToCardSearchResultsData(false);
  };

  return (
    <div className="px-40 mt-6">
      {showSuggestion && searchQueryInput !== "" && (
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
