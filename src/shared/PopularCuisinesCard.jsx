import { IMG_POPULAR_CUSINESS } from "../utils/constant";

/* eslint-disable react/prop-types */
const PopularCuisinesCard = ({
  popularCuisinesData,
  searchQuery,
  suggestionText,
}) => {
  return (
    <>
      {!searchQuery && !suggestionText && (
        <div className="px-40 pt-8">
          <div>{popularCuisinesData?.header?.title}</div>
          <div className="flex w-full gap-2 overflow-x-auto hide-scrollbar mt-4">
            {popularCuisinesData?.imageGridCards?.info?.map((card) => (
              <div
                key={card?.id}
                className="w-[80px] h-[80px] rounded-full flex-shrink-0"
              >
                <img
                  src={IMG_POPULAR_CUSINESS + card?.imageId}
                  className="w-[80px] h-[80px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularCuisinesCard;
