import TopPicksCard from "../shared/TopPicksCard";
import { useRef } from "react";
import useSlide from "../hooks/useSlide";
import Slider from "../shared/Slider";

/* eslint-disable react/prop-types */
const MenuCarousel = ({ resMenuTopPicks, resInformation }) => {
  const topPicklistRef = useRef(null);

  const noToShiftCart = 1;
  // const gapWidth = -32;

  const gapWidth =
    (window.innerWidth < 768 && -60) ||
    (window.innerWidth < 1024 && -42) ||
    (window.innerWidth < 1280 && -65) ||
    (window.innerWidth < 1536 && -88) ||
    -75;

  const { nextSlide, previousSlide, currentSlide, maxSlide } = useSlide(
    topPicklistRef,
    noToShiftCart,
    gapWidth
  );
  const title = resMenuTopPicks?.[0]?.card?.card?.title;
  const carousel = resMenuTopPicks?.[0]?.card?.card?.carousel;

  // flex-nowrap
  return (
    <div className={`${carousel?.length ? "pt-10" : "pt-0"}`}>
      {carousel?.length > 0 && (
        <div className="flex justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>

          <Slider
            nextSlide={nextSlide}
            previousSlide={previousSlide}
            currentSlide={currentSlide}
            maxSlide={maxSlide}
          />
        </div>
      )}

      <div className="w-full overflow-x-auto  hide-scrollbar sm:overflow-hidden  mt-4">
        <div
          className="flex  gap-4 translate-x-0 transition-all duration-300 ease-in-out"
          ref={topPicklistRef}
        >
          {carousel?.map((item) => (
            <div key={item?.bannerId} className="">
              <TopPicksCard
                topPicksData={item?.dish}
                resInformation={resInformation}
              />
            </div>
          ))}
        </div>
      </div>
      {carousel?.length > 0 && (
        <div className="w-full h-[18px] bg-gray-800 mt-10"></div>
      )}
    </div>
  );
};

export default MenuCarousel;
