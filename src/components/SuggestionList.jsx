/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { IMG_SUGGESTION } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addSearchResultType, addSuggestionText } from "../utils/configSlice";

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
    dispatch(addSearchResultType(type));
    // dispatch(addSearchQuery(suggestionText));
    setSearchQueryInput(query);
    setShowSuggestion(false);
  };

  // if (loading) return null;

  return (
    <div className="px-44 mt-6">
      {showSuggestion && searchQuery && (
        <div>
          {searchSuggestions?.map((sugest, index) => (
            <div
              key={index}
              className="flex gap-4 mb-6"
              onClick={() => goToQueryPage(sugest?.text, sugest?.type)}
            >
              <div className="w-[64px] h-[64px] rounded-2xl">
                <img src={IMG_SUGGESTION + sugest?.cloudinaryId} />
              </div>
              <div className="flex-col">
                <h2 className="font-semibold text-[17px]">{sugest?.text}</h2>
                <p className="font-light">{sugest?.subCategory}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionList;
