import SearchDishesCard from "../shared/SearchDishesCard";
import { SearchRestaurantCardWithOffer } from "../shared/SearchRestaurantCard";

import { useDispatch, useSelector } from "react-redux";
import { addIsSelected, addSearchResultType } from "../utils/configSlice";
import {
  addFilterObject,
  addIsResetStore,
  addIsSearchResults,
  addRadioOptionTitle,
  addRadioOptionValue,
  removeFilterObject,
} from "../utils/searchSlice";
import { HiChevronDown } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import SearchResultShimmer from "../shared/shimmer/SearchResultShimmer";

/* eslint-disable react/prop-types */
const SearchResults = ({
  loading,
  showSuggestion,
  searchResultsType,

  selectedOption,
  searchResultsRefineData,
  searchResultsHeader,
  fillObj,
  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeSort, setActiveSort] = useState(false);
  const [isFillBtn, setIsFillBtn] = useState(false);

  const dispatch = useDispatch();

  const selectedOptionTitle = useSelector(
    (store) => store?.search?.options?.radioOptionLabel
  );

  const currentSearch = JSON.parse(localStorage.getItem("recent_Search"));

  const searchResultsForDishes = searchResultsRefineData?.DISH?.cards?.filter(
    (dish) =>
      dish?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Dish"
  );

  const searchResultsForRestaurant = searchResultsRefineData?.RESTAURANT?.cards;
  const searchResultsForAllRestaurant =
    searchResultsRefineData?.RESTAURANT?.cards?.filter(
      (res) =>
        res?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    );

  const searchFilterData = searchResultsRefineData?.DISH?.cards?.filter(
    (fill) =>
      fill?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.SearchFilterSortWidget"
  );

  const getSelectedTab = (value) => {
    dispatch(addSearchResultType(value));
    // setIsSelected(true);

    dispatch(addIsSelected(true));

    // localStorage.setItem(
    //   "selected",
    //   JSON.stringify({
    //     isSelected: true,
    //   })
    // );

    dispatch(addIsSearchResults(true));
  };

  const getFilterObj = (obj) => {
    dispatch(addFilterObject(obj));
    if (!isFillBtn) {
      setIsFillBtn(true);
      dispatch(addIsResetStore(false));
    } else {
      setIsFillBtn(false);
      dispatch(removeFilterObject(obj));
    }
  };

  const handaleClick = () => {
    setShowOptions(!showOptions);
  };

  const updateOptionValue = (value, title) => {
    dispatch(addRadioOptionValue(value));
    dispatch(addRadioOptionTitle(title));

    setActiveSort(true);
    setShowOptions(false);
  };

  // || currentSearch.suggestionText

  return (
    <div className="mx-36">
      {(!showSuggestion || currentSearch?.suggestionText) && (
        <div>
          {loading ? (
            <SearchResultShimmer />
          ) : (
            <>
              <div className="flex gap-4">
                {searchResultsRefineData &&
                  searchResultsHeader?.[0].card?.card?.tab?.map((btn) => (
                    <div key={btn?.id}>
                      <button
                        className={`px-4 py-2  rounded-2xl ${
                          btn?.id === searchResultsType ||
                          (searchResultsType === "CUISINE" && btn?.selected)
                            ? `bg-cyan-900`
                            : "bg-slate-800"
                        }`}
                        value={btn?.id}
                        onClick={(e) => getSelectedTab(e.target.value)}
                      >
                        {btn?.title}
                      </button>
                    </div>
                  ))}
              </div>

              <div className="flex gap-3 mt-6 relative">
                {searchFilterData &&
                  !searchResultsForAllRestaurant &&
                  !searchResultsForRestaurant && (
                    <div
                      className={`px-4 py-2 w-auto  ${
                        activeSort && selectedOptionTitle !== "Relevance"
                          ? "bg-cyan-900"
                          : "bg-slate-800"
                      }  rounded-xl text-[13.5px] flex items-center gap-2`}
                      onClick={handaleClick}
                    >
                      {`Sort By ${
                        selectedOptionTitle === "Relevance"
                          ? ""
                          : selectedOptionTitle
                      }`}
                      <span className="">
                        <HiChevronDown />
                      </span>
                    </div>
                  )}

                {showOptions && (
                  <div className="px-4 py-2 bg-slate-700 absolute top-10">
                    {searchFilterData?.[0]?.card?.card?.sortConfigs?.map(
                      (sort) => (
                        <>
                          <div className="" key={sort.title}>
                            <input
                              className="px-4 py-2 bg-slate-800 rounded-xl text-sm"
                              type="radio"
                              value={sort?.key}
                              name="sort"
                              id={sort?.key}
                              checked={selectedOption === sort?.key}
                              onChange={(e) =>
                                updateOptionValue(e.target.value, sort?.title)
                              }
                            />
                            <label className="ml-2" htmlFor={sort?.key}>
                              {sort?.title}
                            </label>
                          </div>
                        </>
                      )
                    )}
                  </div>
                )}
                {searchFilterData?.[0]?.card?.card?.facetList?.map(
                  (fillter, index) => (
                    <div key={index} className="">
                      <div className="flex justify-between items-center relative">
                        <button
                          value={JSON.stringify({
                            [fillter?.id]: fillter?.facetInfo?.map((item) => ({
                              ["id"]: item?.id,
                              ["label"]: item?.label,
                              ["operator"]: item?.operator,
                            })),
                          })}
                          onClick={(e) =>
                            getFilterObj(JSON.parse(e.target.value))
                          }
                          className={`px-5 py-2  rounded-xl text-[13.5px] ${
                            Object.values(fillObj)?.some(
                              (item) =>
                                item?.[0]?.id === fillter?.facetInfo?.[0]?.id
                            )
                              ? "bg-cyan-900"
                              : "bg-slate-800"
                          }  `}
                        >
                          {fillter?.facetInfo?.[0]?.label}
                          {fillter?.facetInfo?.map(
                            (item, index) =>
                              Object.values(fillObj)?.some(
                                (item) =>
                                  item?.[0]?.id === fillter?.facetInfo?.[0]?.id
                              ) && (
                                <div
                                  className="absolute right-1 top-3"
                                  key={index}
                                >
                                  <HiMiniXMark className="text-sm" />
                                </div>
                              )
                          )}
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className=" bg-slate-900  h-auto mt-5 px-6 py-6">
                {searchResultsForDishes && searchResultsType === "DISH" && (
                  <div className="flex flex-wrap  gap-4 -z-50">
                    {searchResultsForDishes &&
                      searchResultsForDishes?.map((item) => (
                        <div key={item?.card?.card?.info?.id}>
                          <SearchDishesCard
                            searchDishesData={item?.card?.card}
                            setShowAddToCardSearchResultsData={
                              setShowAddToCardSearchResultsData
                            }
                            showAddToCardSearchResultsData={
                              showAddToCardSearchResultsData
                            }
                          />
                        </div>
                      ))}
                  </div>
                )}

                {searchResultsForRestaurant &&
                  searchResultsType === "RESTAURANT" && (
                    <>
                      <div className="flex flex-wrap  gap-4">
                        {searchResultsForRestaurant && (
                          <SearchRestaurantCardWithOffer
                            searchResData={
                              searchResultsForRestaurant?.[0]?.card?.card?.info
                            }
                            offer={
                              searchResultsForRestaurant?.[0]?.card?.card?.info
                                ?.aggregatedDiscountInfoV3
                            }
                            ad={
                              searchResultsForRestaurant?.[0]?.card?.card?.info
                                ?.adTrackingId
                            }
                          />
                        )}
                      </div>

                      <div className="mt-6">
                        <h2>
                          {searchResultsForRestaurant?.[1]?.card?.card?.title}
                        </h2>
                        <div className="flex flex-wrap  gap-4 mt-4">
                          {searchResultsForRestaurant?.[1]?.card?.card?.restaurants?.map(
                            (item) => (
                              <SearchRestaurantCardWithOffer
                                searchResData={item?.info}
                                key={item?.id}
                                offer={item?.info?.aggregatedDiscountInfoV3}
                                ad={item?.info?.adTrackingId}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}

                {searchResultsForAllRestaurant &&
                  (searchResultsType === "RESTAURANT" ||
                    searchResultsType === "CUISINE") && (
                    <>
                      <div className="flex flex-wrap  gap-4">
                        {searchResultsForAllRestaurant?.map((item) => (
                          <SearchRestaurantCardWithOffer
                            searchResData={item?.card?.card?.info}
                            key={item?.card?.card?.id}
                            offer={
                              item?.card?.card?.info?.aggregatedDiscountInfoV3
                            }
                            ad={item?.card?.card?.info?.adTrackingId}
                          />
                        ))}
                      </div>
                    </>
                  )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
