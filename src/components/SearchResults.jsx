import SearchDishesCard from "../shared/SearchDishesCard";
import SearchRestaurantCard from "../shared/SearchRestaurantCard";

import { useDispatch, useSelector } from "react-redux";
import { addSearchResultType } from "../utils/configSlice";
import {
  addFilterObject,
  addIsFillBtnSelected,
  addIsSearchResults,
  addRadioOptionTitle,
  addRadioOptionValue,
  removeFilterObject,
} from "../utils/searchSlice";
import { HiChevronDown } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";

/* eslint-disable react/prop-types */
const SearchResults = ({
  showSuggestion,
  searchResultsType,
  setIsSelected,
  selectedOption,
  searchResultsRefineData,
  searchResultsHeader,
  fillObj,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeSort, setActiveSort] = useState(false);

  const dispatch = useDispatch();

  const selectedOptionTitle = useSelector(
    (store) => store?.search?.options?.radioOptionLabel
  );

  const isFillBtn = useSelector((store) => store?.search?.isFillBtnSelected);

  console.log(selectedOption);

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

  console.log(fillObj);

  const getFilterObj = (obj) => {
    dispatch(addFilterObject(obj));
    if (!isFillBtn) {
      dispatch(addIsFillBtnSelected(true));
    } else {
      dispatch(removeFilterObject(obj));
      dispatch(addIsFillBtnSelected(false));
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

  return (
    <div className="mx-36">
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
                {searchFilterData?.[0]?.card?.card?.sortConfigs?.map((sort) => (
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
                ))}
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
                      onClick={(e) => getFilterObj(JSON.parse(e.target.value))}
                      className={`px-6 py-2  rounded-xl text-[13.5px] ${
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
                            <div className="absolute right-2 top-3" key={index}>
                              <HiMiniXMark className="text-sm" />
                            </div>
                          )
                      )}
                    </button>
                    {/* {isFillBtn && (
                      <div
                        className="absolute right-2"
                        onClick={(e) =>
                          getRemoveItem(JSON.parse(e.target.value))
                        }
                      >
                        <HiMiniXMark className="text-sm" />
                      </div>
                    )} */}
                  </div>
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

// after:content-['×'] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 after:text-white after:text-lg
