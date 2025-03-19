import { Link } from "react-router-dom";
import SearchDishesCard from "../shared/SearchDishesCard";
import SearchResultShimmer from "../shared/shimmer/SearchResultShimmer";
// import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const AddToCartSearchResults = ({
  loading,
  showSuggestion,
  addToCardSearchResults,
}) => {
  // const suggestionText = useSelector(
  //   (store) => store?.config?.setting?.suggestionText
  // );
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
  console.log(searchResultLabel);
  console.log(moreDishesData);

  const moreDishesDataWithResInfo =
    moreDishesData?.[0]?.card?.card?.groupBy?.card?.card;

  const resInformationForMoreDishes = {
    restaurantId: moreDishesDataWithResInfo?.info?.id,
    restaurantName: moreDishesDataWithResInfo?.info?.name,
    resAreaName: moreDishesDataWithResInfo?.info?.locality,
    resImg: moreDishesDataWithResInfo?.info?.cloudinaryImageId,
    menuURL: `/city/kolkata/${moreDishesDataWithResInfo?.info?.name}/${moreDishesDataWithResInfo?.info?.locality}/${moreDishesDataWithResInfo?.info?.id}`,
  };

  return (
    <div className="mx-36">
      {!showSuggestion && (
        <div>
          {loading ? (
            <SearchResultShimmer />
          ) : (
            <div className="bg-slate-900  h-auto mt-5 px-6 py-6">
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
                // onClick={}
              >
                <h2 className="mt-10">
                  {searchResultLabel?.[2]?.card?.card?.text}
                </h2>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToCartSearchResults;
