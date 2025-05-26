import { useRef } from "react";
import ImageInfoLayoutCard from "./ImageInfoLayoutCard";

import useSlide from "../hooks/useSlide";
import Slider from "../shared/Slider";
// import TopRestaurants from "./TopRestaurants";

/* eslint-disable react/prop-types */
const ImageInfoLayout = ({ resData, userData }) => {
  const listRef = useRef(null);

  const noToShiftCart =
    (window.innerWidth < 768 && 2) || (window.innerWidth < 1280 && 3) || 4;
  const gapWidth =
    (window.innerWidth < 768 && -20) ||
    (window.innerWidth < 1280 && -35) ||
    -40;

  const { nextSlide, previousSlide, currentSlide, maxSlide } = useSlide(
    listRef,
    noToShiftCart,
    gapWidth
  );

  const resDataForImageInfoLayoutHeader = resData?.filter(
    (item) => item?.card?.card?.id === "whats_on_your_mind"
  );

  const resDataForImageInfoLayout = resData?.filter(
    (item) => item?.card?.card?.id === "whats_on_your_mind"
  );
  const topRestaurantsHeader =
    resDataForImageInfoLayoutHeader?.[0]?.card?.card?.header?.title;
  const topRestaurants =
    resDataForImageInfoLayout?.[0]?.card?.card?.imageGridCards?.info;

  if (!resData) return;

  // Split into two arrays
  const midIndex = Math.ceil(topRestaurants?.length / 2);
  const firstRow = topRestaurants?.slice(0, midIndex);
  const secondRow = topRestaurants?.slice(midIndex);

  return (
    <div className="mx-1 sm:mx-2">
      <div className="flex justify-between mb-2">
        <h1 className="text-xl sm:text-2xl font-bold">
          {userData !== undefined && topRestaurantsHeader && userData?.name}
          {userData !== undefined && topRestaurantsHeader && userData?.name
            ? ", "
            : ""}
          {topRestaurantsHeader}
        </h1>

        {topRestaurants.length > 0 && (
          <Slider
            nextSlide={nextSlide}
            previousSlide={previousSlide}
            currentSlide={currentSlide}
            maxSlide={maxSlide}
          />
        )}
      </div>

      {/* Row 1 */}
      <div className="w-full  overflow-x-auto  overflow-y-hidden hide-scrollbar sm:overflow-hidden slider">
        <div
          className="hidden sm:flex translate-x-0 transition-all duration-300 ease-in-out"
          ref={listRef}
        >
          {topRestaurants?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
        <div className="flex sm:hidden mb-1">
          {firstRow?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
        <div className="flex sm:hidden -mt-5">
          {secondRow?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
        {topRestaurants && (
          <div className="w-full h-[1px] bg-slate-700 mt-6 sm:mt-10"></div>
        )}
      </div>
    </div>
  );
};

export default ImageInfoLayout;
