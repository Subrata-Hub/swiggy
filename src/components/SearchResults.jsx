import SearchDishesCard from "../shared/SearchDishesCard";
import SearchRestaurantCard from "../shared/SearchRestaurantCard";

import { useDispatch } from "react-redux";
import { addSearchResultType } from "../utils/configSlice";
import { addFilterObject, addIsSearchResults } from "../utils/searchSlice";
import { useState } from "react";

/* eslint-disable react/prop-types */
const SearchResults = ({
  showSuggestion,
  searchResultsType,
  setIsSelected,

  searchResultsRefineData,
  searchResultsHeader,
}) => {
  const [fillterObj, setFilterObj] = useState({});
  const dispatch = useDispatch();

  console.log(searchResultsRefineData);

  const searchResultsForDishes = searchResultsRefineData?.DISH?.cards?.filter(
    (dish) =>
      dish?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Dish"
  );
  console.log(searchResultsForDishes);
  const searchResultsForRestaurant = searchResultsRefineData?.RESTAURANT?.cards;
  const searchResultsForAllRestaurant =
    searchResultsRefineData?.RESTAURANT?.cards?.filter(
      (res) =>
        res?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    );
  console.log(searchResultsForAllRestaurant);

  const searchFilterData = searchResultsRefineData?.DISH?.cards?.filter(
    (fill) =>
      fill?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.SearchFilterSortWidget"
  );

  console.log(searchFilterData);

  const searchResultForSimilarRestaurant =
    searchResultsRefineData?.RESTAURANT?.cards?.filter(
      (simRes) =>
        simRes.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.RestaurantCollection"
    );
  console.log(searchResultForSimilarRestaurant);

  const getSelectedTab = (value) => {
    dispatch(addSearchResultType(value));
    setIsSelected(true);
    dispatch(addIsSearchResults(true));
  };

  const getFilterObj = (obj) => {
    setFilterObj((prevObj) => ({ ...prevObj, ...obj }));
    dispatch(addFilterObject(fillterObj));
  };

  // console.log(fillterObj);

  return (
    <div className="mx-40">
      {!showSuggestion && (
        <div>
          <div className="flex gap-4">
            {searchResultsHeader?.[0].card?.card?.tab?.map((btn) => (
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
            {searchFilterData?.[0]?.card?.card?.facetList?.map(
              (fillter, index) => (
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
              )
            )}
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
            {/* {searchResultsByFilter && (
              <div className="flex flex-wrap  gap-4">
                {searchResultsByFilter &&
                  searchResultsByFilter?.map((item) => (
                    <SearchDishesCard
                      key={item?.card?.card?.info?.id}
                      searchDishesData={item?.card?.card}
                    />
                  ))}
              </div>
            )} */}
            {searchResultsForRestaurant && (
              <>
                <div className="flex flex-wrap  gap-4">
                  {searchResultsForRestaurant && (
                    <SearchRestaurantCard
                      searchResData={
                        searchResultsForRestaurant?.[0]?.card?.card?.info
                      }
                    />
                  )}
                </div>

                <div>
                  <h2>{searchResultsForRestaurant?.[1]?.card?.card?.title}</h2>
                  <div className="flex flex-wrap  gap-4">
                    {searchResultsForRestaurant?.[1]?.card?.card?.restaurants?.map(
                      (item) => (
                        <SearchRestaurantCard
                          key={item?.id}
                          searchResData={item?.info}
                        />
                      )
                    )}
                  </div>
                </div>
              </>
            )}
            {/* {searchResultsForRestaurant && (
              <>
                <h2>{searchResultsForRestaurant?.[1]?.card?.card?.title}</h2>
                <div className="flex flex-wrap  gap-4">
                  {searchResultsForRestaurant?.[1]?.card?.card?.restaurants?.map(
                    (item) => (
                      <SearchRestaurantCard
                        key={item?.id}
                        searchResData={item?.info}
                      />
                    )
                  )}
                </div>
              </>
            )} */}
            {searchResultsForAllRestaurant && (
              <>
                <div className="flex flex-wrap  gap-4">
                  {searchResultsForAllRestaurant?.map((item) => (
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
