import { Link } from "react-router-dom";
import SearchDishesCard from "../shared/SearchDishesCard";
import SearchResultShimmer from "../shared/shimmer/SearchResultShimmer";
// import { useEffect } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const AddToCartSearchResults = ({
  loading,
  showSuggestion,
  addToCardSearchResults,

  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,
  city,
}) => {
  // const cartNumber = useSelector((state) => state.cart.totalCardItems);
  // const userCartItems = JSON.parse(localStorage.getItem("cart_items"));
  // const currentSearch = JSON.parse(localStorage.getItem("recent_Search"));

  const searchResultLabel = addToCardSearchResults?.cards?.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.Label"
  );
  const searchResultsForDishes = addToCardSearchResults?.cards?.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Dish"
  );

  const moreDishesData = addToCardSearchResults?.cards?.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.Collection"
  );

  // const userMenuItem = userCartItems?.items?.[0]?.find(
  //   (item) => item.menuId === ?.info?.id
  // );

  console.log(moreDishesData);

  const moreDishesDataWithResInfo =
    moreDishesData?.[0]?.card?.card?.groupBy?.card?.card;

  const resInformationForMoreDishes = {
    restaurantId: moreDishesDataWithResInfo?.info?.id,
    restaurantName: moreDishesDataWithResInfo?.info?.name,
    resAreaName: moreDishesDataWithResInfo?.info?.locality,
    resImg: moreDishesDataWithResInfo?.info?.cloudinaryImageId,
    menuURL: `/city/${city}/${moreDishesDataWithResInfo?.info?.name}/${moreDishesDataWithResInfo?.info?.locality}/${moreDishesDataWithResInfo?.info?.id}`,
  };

  // const backToSearchResultsPage = () => {
  //   setShowAddToCardSearchResultsData(false);
  // };

  // useEffect(() => {
  //   if (cartNumber === 0 && showAddToCardSearchResultsData) {
  //     setShowAddToCardSearchResultsData(false);
  //   } else {
  //     setShowAddToCardSearchResultsData(true);
  //   }
  // }, [cartNumber]);

  // console.log(searchResultsForDishes);

  return (
    <div className="">
      {!showSuggestion && (
        <div>
          {loading ? (
            <SearchResultShimmer />
          ) : (
            <div className="bg-slate-900  h-auto mt-5 px-2 sm:px-6 py-6">
              <h2 className="mb-6">
                {searchResultLabel?.[0]?.card?.card?.text}
              </h2>
              {searchResultsForDishes && (
                <div className="flex flex-wrap  gap-4 -z-50">
                  {searchResultsForDishes &&
                    searchResultsForDishes?.map((item) => (
                      <div key={item?.card?.card?.info?.id}>
                        <SearchDishesCard searchDishesData={item?.card?.card} />
                      </div>
                    ))}
                </div>
              )}

              <h2 className="py-3 mb-4 text-lg">
                {moreDishesData?.[0]?.card?.card?.title}
              </h2>
              {moreDishesData && (
                <div className="flex flex-wrap  gap-4 -z-50">
                  {moreDishesData &&
                    moreDishesData?.[0]?.card?.card?.cards?.map((item) => (
                      <div key={item?.card?.info?.id}>
                        <SearchDishesCard
                          searchDishesData={item?.card}
                          resInformationForMoreDishes={
                            resInformationForMoreDishes
                          }
                          hideHeader={true}
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
              <Link to={resInformationForMoreDishes?.menuURL}>
                <div className="w-full h-13 bg-slate-800 mt-4 flex justify-center items-center">
                  {searchResultLabel?.[1]?.card?.card?.text}
                </div>
              </Link>
              <div
                className="w-full h-[250px] bg-slate-800 mt-4 flex justify-center"
                // onClick={backToSearchResultsPage}
              >
                <button className="mt-10">
                  {searchResultLabel?.[2]?.card?.card?.text}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToCartSearchResults;
