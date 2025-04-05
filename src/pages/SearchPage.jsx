/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDispatch } from "react-redux";
import { addIsResetStore, resetState } from "../utils/searchSlice";

import useAddToCardSearchResults from "../hooks/useAddToCardSearchResults";
import AddToCartSearchResults from "../components/AddToCartSearchResults";

const SearchPage = () => {
  const [showSuggestion, setShowSuggestion] = useState(true);

  const [isSelected, setIsSelected] = useState(false);
  const [searchResultsRefineData, setSearchResultsRefineData] = useState(null);
  const [showAddToCardSearchResultsData, setShowAddToCardSearchResultsData] =
    useState(false);
  const [searchQueryInput, setSearchQueryInput] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userLocationData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );

  const LAT = userLocationData && userLocationData?.latlng?.LAT;
  const LNG = userLocationData && userLocationData?.latlng?.LNG;

  console.log(LAT, LNG);

  const preSearchData = usePreSearch(LAT, LNG);

  const popularCuisinesData = preSearchData?.cards?.[1]?.card?.card;

  const suggestionText = useSelector(
    (store) => store?.config?.setting?.suggestionText
  );

  const searchResultsType = useSelector(
    (store) => store?.config?.setting?.searchResultType
  );

  const selectedOption = useSelector(
    (store) => store?.search?.options?.radioOptionValue
  );

  const fillObj = useSelector((store) => store?.search?.filterObj);

  const isReSetStore = useSelector((store) => store?.search?.isResetStore);
  const resParamsObj = useSelector((store) => store?.search?.resParams);
  const searchSuggestionsData = useSuggestions(searchQueryInput, LAT, LNG);

  const searchResultsData = useSearchResults(
    suggestionText,
    setLoading,
    LAT,
    LNG
  );

  const selectedTabSearchResults = useSelectedTabResult(
    suggestionText,
    searchResultsType,
    isSelected,
    setLoading,
    LAT,
    LNG
  );

  const objectString = JSON.stringify(fillObj);
  const encodedString = encodeURIComponent(objectString);

  const filterSearchResults = useSearchFilter(
    suggestionText,
    searchResultsType,
    encodedString,
    selectedOption,
    setLoading,
    isReSetStore,
    LAT,
    LNG
  );

  const addToCardSearchResults = useAddToCardSearchResults(
    suggestionText,
    setLoading,
    resParamsObj?.resId,
    resParamsObj?.menuId,
    LAT,
    LNG
  );

  const getRefineData = (data) => {
    const refineSearchResultsData = data?.cards?.filter(
      (item) =>
        item?.card?.card?.["@type"] !==
        "type.googleapis.com/swiggy.gandalf.widgets.v2.Navigation"
    );
    return refineSearchResultsData?.[0]?.groupedCard?.cardGroupMap;
  };

  const searchResultsHeader = searchResultsData?.cards?.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.Navigation"
  );

  useEffect(() => {
    if (searchResultsData) {
      setSearchResultsRefineData(getRefineData(searchResultsData));
      dispatch(resetState());
      dispatch(addIsResetStore(true));
    }
  }, [searchResultsData, location.pathname, dispatch]);

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
        suggestionText={suggestionText}
        setSearchQueryInput={setSearchQueryInput}
        searchQueryInput={searchQueryInput}
      />
      <SuggestionList
        searchSuggestionsData={searchSuggestionsData}
        setShowSuggestion={setShowSuggestion}
        showSuggestion={showSuggestion}
        setShowAddToCardSearchResultsData={setShowAddToCardSearchResultsData}
        setSearchQueryInput={setSearchQueryInput}
        searchQueryInput={searchQueryInput}
      />
      {addToCardSearchResults &&
      addToCardSearchResults !== undefined &&
      showAddToCardSearchResultsData &&
      !searchResultsRefineData ? (
        <AddToCartSearchResults
          showSuggestion={showSuggestion}
          loading={loading}
          addToCardSearchResults={addToCardSearchResults}
          setShowAddToCardSearchResultsData={setShowAddToCardSearchResultsData}
        />
      ) : (
        <SearchResults
          loading={loading}
          showSuggestion={showSuggestion}
          searchResultsType={searchResultsType}
          setIsSelected={setIsSelected}
          selectedOption={selectedOption}
          searchResultsRefineData={searchResultsRefineData}
          searchResultsHeader={searchResultsHeader}
          fillObj={fillObj}
          // addToCardSearchResults={addToCardSearchResults}
          setShowAddToCardSearchResultsData={setShowAddToCardSearchResultsData}
          showAddToCardSearchResultsData={showAddToCardSearchResultsData}
        />
      )}
    </div>
  );
};

export default SearchPage;
