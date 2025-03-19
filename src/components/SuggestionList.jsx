/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { IMG_SUGGESTION } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addSearchResultType, addSuggestionText } from "../utils/configSlice";
// import { addIsResetStore, addSearchQuery } from "../utils/searchSlice";

const SuggestionList = ({
  searchSuggestionsData,
  setShowSuggestion,
  showSuggestion,
  searchQuery,
  setSearchQueryInput,
  // loading,
}) => {
  // const [showSuggestion, setShowSuggestion] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchSuggestions = searchSuggestionsData?.suggestions;

  const goToQueryPage = (query, type) => {
    navigate(`/search?query=${query}`);
    dispatch(addSuggestionText(query));
    // dispatch(addIsResetStore(false));
    dispatch(addSearchResultType(type));
    // dispatch(addSearchQuery(suggestionText));
    setSearchQueryInput(query);
    setShowSuggestion(false);
  };

  // if (loading) return null;

  return (
    <div className="px-40 mt-6">
      {showSuggestion && searchQuery && (
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
