import PopularCuisinesCard from "../shared/PopularCuisinesCard";

/* eslint-disable react/prop-types */
const PopularCuisinesList = ({
  popularCuisinesData,

  suggestionText,
  setSearchQueryInput,
  searchQueryInput,
  showSuggestion,
  setShowSearchIcon,
}) => {
  const currentSearch = JSON.parse(localStorage.getItem("recent_Search"));

  // px-40

  return (
    <div className="">
      {(!suggestionText || !searchQueryInput) &&
        (!currentSearch || !showSuggestion) && (
          <div className="pt-8 px-4">
            <div>{popularCuisinesData?.header?.title}</div>
            <div className="flex w-full gap-2 overflow-x-auto hide-scrollbar mt-4">
              {popularCuisinesData?.imageGridCards?.info?.map((card) => (
                <PopularCuisinesCard
                  key={card?.id}
                  popularCuisines={card}
                  setSearchQueryInput={setSearchQueryInput}
                  setShowSearchIcon={setShowSearchIcon}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default PopularCuisinesList;
