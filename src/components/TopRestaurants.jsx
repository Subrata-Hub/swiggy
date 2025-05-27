import { useRef } from "react";
import { EnhancedRestaurantCard } from "../shared/RestaurantCard";
import useSlide from "../hooks/useSlide";

import Slider from "../shared/Slider";

/* eslint-disable react/prop-types */
const TopRestaurants = ({ topResData, city }) => {
  const noToShiftCart =
    (window.innerWidth < 768 && 2) || (window.innerWidth < 1280 && 3) || 4;

  const gapWidth = window.innerWidth <= 760 ? 16 : 24;
  const resListRef = useRef(null);

  const { nextSlide, previousSlide, currentSlide, maxSlide } = useSlide(
    resListRef,
    noToShiftCart,
    gapWidth
  );
  const topRestaurantsHeader = topResData?.[0]?.card?.card?.header?.title;
  const topRestaurants =
    topResData?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  return (
    <>
      <div
        className={`${topRestaurantsHeader ? "mt-3 sm:mt-10" : "mt-0"} ml-2`}
      >
        {topRestaurants.length > 0 && (
          <div className="flex justify-between">
            <h1 className="text-[22px] font-semibold">
              {topRestaurantsHeader}
            </h1>

            <div className="mr-2">
              <Slider
                nextSlide={nextSlide}
                previousSlide={previousSlide}
                currentSlide={currentSlide}
                maxSlide={maxSlide}
              />
            </div>
          </div>
        )}

        <div className="flex w-full overflow-x-auto hide-scrollbar sm:overflow-hidden slider mt-4">
          <div
            className="flex justify-center xl:justify-start gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 translate-x-0 transition-all duration-300 ease-in-out"
            ref={resListRef}
          >
            {topRestaurants?.map((topRes) => (
              <EnhancedRestaurantCard
                topRes={topRes?.info}
                key={topRes?.info?.id}
                offer={topRes?.info?.aggregatedDiscountInfoV3}
                city={city}
              />
            ))}
          </div>
        </div>
      </div>
      {topRestaurants && (
        <div className="w-full h-[1px] bg-slate-700 mt-5 sm:mt-13"></div>
      )}
    </>
  );
};

export default TopRestaurants;
