import SearchDishesCard from "../shared/SearchDishesCard";
import SearchRestaurantCard from "../shared/SearchRestaurantCard";

import { useDispatch } from "react-redux";
import { addSearchResultType } from "../utils/configSlice";

/* eslint-disable react/prop-types */
const SearchResults = ({
  showSuggestion,
  searchResults,
  searchResultsType,
  selectedTabSearchResults,
}) => {
  const dispatch = useDispatch();

  let searchData = searchResults?.cards?.[1];
  if (selectedTabSearchResults) {
    searchData = selectedTabSearchResults?.cards?.[0];
  }

  const searchResultsHeader = searchResults?.cards?.[0]?.card?.card?.tab;
  const searchResultsForDishes =
    searchData?.groupedCard?.cardGroupMap?.DISH?.cards?.slice(1);

  const searchResultsForRestaurant =
    searchData?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.[0];

  const searchResultForSimilarRestaurant =
    searchData?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.[1]?.card?.card;

  const searchResultsForRestaurantForTab =
    searchData?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;

  const getSelectedTab = (value) => {
    dispatch(addSearchResultType(value));
  };

  return (
    <div className="mx-40">
      {!showSuggestion && (
        <div>
          <div className="flex gap-4">
            {searchResultsHeader?.map((btn) => (
              <div key={btn?.id}>
                <button
                  className={`px-4 py-2  rounded-2xl ${
                    btn?.id === searchResultsType
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
            {searchResultsForRestaurant && !selectedTabSearchResults && (
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
