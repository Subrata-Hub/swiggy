import SearchDishesCard from "../shared/SearchDishesCard";
import SearchRestaurantCard from "../shared/SearchRestaurantCard";

import { useDispatch } from "react-redux";
import { addSearchResultType } from "../utils/configSlice";
import { addIsSearchResults } from "../utils/searchSlice";
import { useState } from "react";
import useSearchFilter from "../hooks/useSearchFilter";

/* eslint-disable react/prop-types */
const SearchResults = ({
  showSuggestion,
  searchResults,
  searchResultsType,
  selectedTabSearchResults,
  setIsSelected,
  suggestionText,
}) => {
  const [fillterObj, setFilterObj] = useState({});
  const dispatch = useDispatch();

  const objectString = JSON.stringify(fillterObj);
  const encodedString = encodeURIComponent(objectString);

  const filterSearchResults = useSearchFilter(
    suggestionText,
    searchResultsType,
    encodedString
  );
  console.log(filterSearchResults);
  console.log(searchResults);

  const searchResultsHeader = searchResults?.cards?.[0]?.card?.card?.tab;

  let searchData;
  if (searchResults) {
    searchData = searchResults?.cards?.[1];
  }
  if (selectedTabSearchResults) {
    searchData = selectedTabSearchResults?.cards?.[0];
  }

  if (filterSearchResults) {
    searchData = filterSearchResults?.cards?.[0];
  }

  console.log(searchData);

  // const searchFilterWithDishes =
  //   searchResults?.cards?.[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.[0]?.card
  //     ?.card?.facetList;

  const searchResultsForDishes =
    searchData?.groupedCard?.cardGroupMap?.DISH?.cards?.slice(1);

  const searchFilterData =
    searchData?.groupedCard?.cardGroupMap?.DISH?.cards?.[0]?.card?.card
      ?.facetList;
  console.log(searchFilterData);

  const searchResultsByFilter =
    searchData?.groupedCard?.cardGroupMap?.DISH?.cards?.slice(1);

  const searchResultsForRestaurant =
    searchData?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.[0];

  const searchResultForSimilarRestaurant =
    searchData?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.[1]?.card?.card;

  const searchResultsForRestaurantForTab =
    searchData?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;

  console.log(searchResultsForRestaurantForTab);

  const getSelectedTab = (value) => {
    dispatch(addSearchResultType(value));
    setIsSelected(true);
    dispatch(addIsSearchResults(true));
  };

  const getFilterObj = (obj) => {
    setFilterObj((prevObj) => ({ ...prevObj, ...obj }));
  };

  console.log(fillterObj);

  return (
    <div className="mx-40">
      {!showSuggestion && (
        <div>
          <div className="flex gap-4">
            {searchResultsHeader?.map((btn) => (
              <div key={btn?.id}>
                <button
                  className={`px-4 py-2  rounded-2xl ${
                    btn?.id === searchResultsType ||
                    (searchResultsType === "CUISINE" && btn?.selected)
                      ? `bg-red-500`
                      : "bg-fuchsia-700"
                  }`}
                  value={btn?.id}
                  onClick={(e) => getSelectedTab(e.target.value)}
                >
                  {btn?.title}
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            {searchFilterData &&
              searchFilterData?.map((fillter, index) => (
                <div key={index}>
                  <button
                    value={JSON.stringify({
                      [fillter?.id]: fillter?.facetInfo?.map((item) => ({
                        ["id"]: item?.id,
                        ["label"]: item?.label,
                        ["operator"]: item?.operator,
                      })),
                    })}
                    onClick={(e) => getFilterObj(JSON.parse(e.target.value))}
                    className="px-4 py-2 bg-slate-800 rounded-xl text-sm"
                  >
                    {fillter?.facetInfo?.[0]?.label}
                  </button>
                </div>
              ))}
          </div>

          <div className=" bg-slate-900  h-auto mt-4 px-6">
            {searchResultsForDishes && (
              <div className="flex flex-wrap  gap-4">
                {searchResultsForDishes &&
                  searchResultsForDishes?.map((item) => (
                    <SearchDishesCard
                      key={item?.card?.card?.info?.id}
                      searchDishesData={item?.card?.card}
                    />
                  ))}
              </div>
            )}
            {searchResultsByFilter && (
              <div className="flex flex-wrap  gap-4">
                {searchResultsByFilter &&
                  searchResultsByFilter?.map((item) => (
                    <SearchDishesCard
                      key={item?.card?.card?.info?.id}
                      searchDishesData={item?.card?.card}
                    />
                  ))}
              </div>
            )}
            {searchResultsForRestaurant && (
              <div className="flex flex-wrap  gap-4">
                {searchResultsForRestaurant && (
                  <SearchRestaurantCard
                    searchResData={searchResultsForRestaurant?.card?.card?.info}
                  />
                )}
              </div>
            )}
            {searchResultForSimilarRestaurant && (
              <>
                <h2>{searchResultForSimilarRestaurant?.title}</h2>
                <div className="flex flex-wrap  gap-4">
                  {searchResultForSimilarRestaurant?.restaurants?.map(
                    (item) => (
                      <SearchRestaurantCard
                        key={item?.id}
                        searchResData={item?.info}
                      />
                    )
                  )}
                </div>
              </>
            )}
            {searchResultsForRestaurantForTab && (
              <>
                <div className="flex flex-wrap  gap-4">
                  {searchResultsForRestaurantForTab?.map((item) => (
                    <SearchRestaurantCard
                      key={item?.card?.card?.id}
                      searchResData={item?.card?.card?.info}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

//  btn?.selected
