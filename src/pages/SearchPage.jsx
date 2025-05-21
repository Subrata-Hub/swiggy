/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

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

import useSearchResultsForEnter from "../hooks/useSearchResultsForEnter";

import ResentResSearchList from "../components/ResentResSearchList";
import PreviewCartViewForMobile from "../shared/PreviewCartViewForMobile";
import MobileNavigation from "../components/MobileNavigation";

const SearchPage = () => {
  const [showSuggestion, setShowSuggestion] = useState(true);

  const [searchResultsRefineData, setSearchResultsRefineData] = useState(null);
  const [showAddToCardSearchResultsData, setShowAddToCardSearchResultsData] =
    useState(false);

  const currentSearch = JSON.parse(localStorage.getItem("recent_Search"));

  const [searchQueryInput, setSearchQueryInput] = useState(
    currentSearch?.suggestionText
  );

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentLocation = JSON.parse(localStorage.getItem("current_location"));

  const userLocationData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );

  const LAT =
    (userLocationData && userLocationData?.latlng?.LAT) ||
    currentLocation.latlng.LAT;
  const LNG =
    (userLocationData && userLocationData?.latlng?.LNG) ||
    currentLocation.latlng.LNG;

  console.log(LAT, LNG);

  const preSearchData = usePreSearch(LAT, LNG);

  const popularCuisinesData = preSearchData?.cards?.[1]?.card?.card;

  const suggestionText = useSelector(
    (store) => store?.config?.setting?.suggestionText
  );
  const searchResultsType = useSelector(
    (store) => store?.config?.setting?.searchResultType
  );

  const selectedFromStore = useSelector(
    (store) => store?.config?.setting?.isSelected
  );

  const submitAction = useSelector(
    (store) => store?.config?.setting?.searchActionType
  );
  const selectedOption = useSelector(
    (store) => store?.search?.options?.radioOptionValue
  );

  const fillObj = useSelector((store) => store?.search?.filterObj);

  const isReSetStore = useSelector((store) => store?.search?.isResetStore);
  const resParamsObj = useSelector((store) => store?.search?.resParams);
  const placeData = useSelector(
    (store) => store.firebaseData?.userLocationData
  );
  const placeArray = placeData?.address_components?.filter((cityList) =>
    cityList?.types?.find((item) => item === "city")
  );

  const city = placeArray?.[0]?.long_name;

  const searchSuggestionsData = useSuggestions(searchQueryInput, LAT, LNG);

  const searchResultsData = useSearchResults(
    suggestionText,
    setLoading,
    LAT,
    LNG,
    submitAction
  );

  const searchResultsDataForEnter = useSearchResultsForEnter(
    currentSearch?.suggestionText,
    setLoading,
    LAT,
    LNG,
    location.pathname
  );

  const selectedTabSearchResults = useSelectedTabResult(
    suggestionText ? suggestionText : currentSearch?.suggestionText,
    searchResultsType ? searchResultsType : currentSearch?.searchResultType,

    selectedFromStore,
    setLoading,
    LAT,
    LNG
  );

  const objectString = JSON.stringify(fillObj);
  const encodedString = encodeURIComponent(objectString);

  const filterSearchResults = useSearchFilter(
    currentSearch?.suggestionText || suggestionText,
    currentSearch?.searchResultType || searchResultsType,

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

  console.log(addToCardSearchResults);

  const getRefineData = (data) => {
    const refineSearchResultsData = data?.cards?.filter(
      (item) =>
        item?.card?.card?.["@type"] !==
        "type.googleapis.com/swiggy.gandalf.widgets.v2.Navigation"
    );
    return refineSearchResultsData?.[0]?.groupedCard?.cardGroupMap;
  };

  const searchResultsHeader = (
    searchResultsData || searchResultsDataForEnter
  )?.cards?.filter(
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
    if (searchResultsDataForEnter) {
      setSearchResultsRefineData(getRefineData(searchResultsDataForEnter));
    }
  }, [searchResultsDataForEnter]);

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
    <>
      <div className="mt-28 mx-0 xs:mx-[10px]  sm:mx-[30px] md:mx-[30px] lg:mx-[50px] xl:mx-[150px] 2xl:mx-[290px]">
        <Searchbar
          setShowSuggestion={setShowSuggestion}
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

        <ResentResSearchList
          suggestionText={suggestionText}
          searchQueryInput={searchQueryInput}
          setSearchQueryInput={setSearchQueryInput}
          setShowSuggestion={setShowSuggestion}
        />

        <PopularCuisinesList
          popularCuisinesData={popularCuisinesData}
          suggestionText={suggestionText}
          setSearchQueryInput={setSearchQueryInput}
          searchQueryInput={searchQueryInput}
          showSuggestion={showSuggestion}
        />

        {addToCardSearchResults &&
        addToCardSearchResults !== undefined &&
        showAddToCardSearchResultsData ? (
          <AddToCartSearchResults
            showSuggestion={showSuggestion}
            loading={loading}
            addToCardSearchResults={
              addToCardSearchResults && addToCardSearchResults
            }
            setShowAddToCardSearchResultsData={
              setShowAddToCardSearchResultsData
            }
            showAddToCardSearchResultsData={showAddToCardSearchResultsData}
            city={city}
          />
        ) : (
          <SearchResults
            loading={loading}
            showSuggestion={showSuggestion}
            searchResultsType={
              searchResultsType || currentSearch?.searchResultType
            }
            selectedOption={selectedOption}
            searchResultsRefineData={searchResultsRefineData}
            searchResultsHeader={searchResultsHeader}
            fillObj={fillObj}
            setShowAddToCardSearchResultsData={
              setShowAddToCardSearchResultsData
            }
            showAddToCardSearchResultsData={showAddToCardSearchResultsData}
          />
        )}
      </div>
      <div className="ml-4">
        <PreviewCartViewForMobile />
        <MobileNavigation />
      </div>
    </>
  );
};

export default SearchPage;
