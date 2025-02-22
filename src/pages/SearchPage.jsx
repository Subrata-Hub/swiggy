import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import SuggestionList from "../components/SuggestionList";
import usePreSearch from "../hooks/usePreSearch";

import useSuggestions from "../hooks/useSuggestions";

import SearchResults from "../components/SearchResults";
import { useState } from "react";
import useSearchResults from "../hooks/useSearchResults";
import useSelectedTabResult from "../hooks/useSelectedTabResult";
import PopularCuisinesList from "../components/PopularCuisinesList";

const SearchPage = () => {
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const preSearchData = usePreSearch();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const searchSuggestionsData = useSuggestions(searchQuery);
  const popularCuisinesData = preSearchData?.cards?.[1]?.card?.card;

  const suggestionText = useSelector(
    (store) => store?.config?.setting?.suggestionText
  );

  const searchResultsType = useSelector(
    (store) => store.config.setting.searchResultType
  );

  console.log(searchResultsType);

  const searchResultsData = useSearchResults(searchQueryInput, suggestionText);

  const selectedTabSearchResults = useSelectedTabResult(
    suggestionText,
    searchResultsType,
    isSelected
  );

  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      <Searchbar
        setShowSuggestion={setShowSuggestion}
        setSearchQueryInput={setSearchQueryInput}
        searchQueryInput={searchQueryInput}
      />

      <PopularCuisinesList
        popularCuisinesData={popularCuisinesData}
        searchQuery={searchQuery}
        suggestionText={suggestionText}
        setSearchQueryInput={setSearchQueryInput}
        searchQueryInput={searchQueryInput}
      />
      <SuggestionList
        searchQuery={searchQuery}
        searchSuggestionsData={searchSuggestionsData}
        setShowSuggestion={setShowSuggestion}
        showSuggestion={showSuggestion}
        setSearchQueryInput={setSearchQueryInput}
      />
      <SearchResults
        searchQuery={searchQuery}
        showSuggestion={showSuggestion}
        searchResults={searchResultsData}
        searchResultsType={searchResultsType}
        suggestionText={suggestionText}
        selectedTabSearchResults={selectedTabSearchResults}
        setIsSelected={setIsSelected}
      />
    </div>
  );
};

export default SearchPage;
