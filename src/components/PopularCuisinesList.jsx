import PopularCuisinesCard from "../shared/PopularCuisinesCard";

/* eslint-disable react/prop-types */
const PopularCuisinesList = ({
  popularCuisinesData,

  suggestionText,
  setSearchQueryInput,
  searchQueryInput,
}) => {
  return (
    <div className="">
      {((!suggestionText && !searchQueryInput) || searchQueryInput === "") && (
        <div className="px-40 pt-8">
          <div>{popularCuisinesData?.header?.title}</div>
          <div className="flex w-full gap-2 overflow-x-auto hide-scrollbar mt-4">
            {popularCuisinesData?.imageGridCards?.info?.map((card) => (
              <PopularCuisinesCard
                key={card?.id}
                popularCuisines={card}
                setSearchQueryInput={setSearchQueryInput}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularCuisinesList;
