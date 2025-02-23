import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import SuggestionList from "../components/SuggestionList";
import usePreSearch from "../hooks/usePreSearch";

import useSuggestions from "../hooks/useSuggestions";

import SearchResults from "../components/SearchResults";
import { useEffect, useState } from "react";
import useSearchResults from "../hooks/useSearchResults";
import useSelectedTabResult from "../hooks/useSelectedTabResult";
import PopularCuisinesList from "../components/PopularCuisinesList";
import useSearchFilter from "../hooks/useSearchFilter";

const SearchPage = () => {
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [searchResultsRefineData, setSearchResultsRefineData] = useState(null);

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

  const fillObj = useSelector((store) => store.search.filterObj);

  console.log(searchResultsType);

  const searchResultsData = useSearchResults(suggestionText);
  console.log(searchResultsData);

  const getRefineData = (data) => {
    const refineSearchResultsData = data?.cards?.filter(
      (item) =>
        item?.card?.card?.["@type"] !==
        "type.googleapis.com/swiggy.gandalf.widgets.v2.Navigation"
    );
    return refineSearchResultsData?.[0]?.groupedCard.cardGroupMap;
  };

  const selectedTabSearchResults = useSelectedTabResult(
    suggestionText,
    searchResultsType,
    isSelected
  );

  const objectString = JSON.stringify(fillObj);
  const encodedString = encodeURIComponent(objectString);

  const filterSearchResults = useSearchFilter(
    suggestionText,
    searchResultsType,
    encodedString
  );

  const searchResultsHeader = searchResultsData?.cards?.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.Navigation"
  );

  console.log(searchResultsRefineData);

  useEffect(() => {
    if (searchResultsData) {
      setSearchResultsRefineData(getRefineData(searchResultsData));
    }
  }, [searchResultsData]);

  useEffect(() => {
    if (selectedTabSearchResults) {
      setSearchResultsRefineData(getRefineData(selectedTabSearchResults));
    }
  }, [selectedTabSearchResults]);

  useEffect(() => {
    if (filterSearchResults) {
      setSearchResultsRefineData(getRefineData(filterSearchResults));
    }
  }, [filterSearchResults]);

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
        showSuggestion={showSuggestion}
        searchResultsRefineData={searchResultsRefineData}
        searchResultsHeader={searchResultsHeader}
        searchResultsType={searchResultsType}
        setIsSelected={setIsSelected}
      />
    </div>
  );
};

export default SearchPage;
