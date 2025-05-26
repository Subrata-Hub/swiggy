import useSlide from "../hooks/useSlide";
import { IMG_OFFER_LOGO } from "../utils/constant";
import { useRef } from "react";
import Slider from "./Slider";

/* eslint-disable react/prop-types */
const OfferCard = ({ resDetailsData }) => {
  const noToShiftCart = 1;
  // const gapWidth = -50;

  const gapWidth =
    (window.innerWidth < 768 && -60) ||
    (window.innerWidth < 1280 && -95) ||
    (window.innerWidth < 1536 && -129) ||
    -108;

  const offerListRef = useRef();

  const { nextSlide, previousSlide, currentSlide, maxSlide } = useSlide(
    offerListRef,
    noToShiftCart,
    gapWidth
  );
  return (
    <div className=" mt-4">
      <div className="flex justify-between">
        <h1 className="text-xl">Deals for you</h1>

        <Slider
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          currentSlide={currentSlide}
          maxSlide={maxSlide}
        />
      </div>

      <div className="w-full overflow-x-auto hide-scrollbar sm:overflow-hidden  mt-4 ">
        <div
          className="flex gap-4 translate-x-0 transition-all duration-300 ease-in-out"
          ref={offerListRef}
        >
          {resDetailsData?.map((offcard, index) => (
            <div
              key={index}
              className="w-86 h-24 bg-cyan-950 flex-shrink-0 rounded-2xl flex items-center p-4 slide"
            >
              <div className="flex gap-4">
                <div className="w-[48px] h-[48px]">
                  <img
                    src={IMG_OFFER_LOGO + offcard?.info?.offerLogo}
                    loading="lazy"
                  />
                </div>
                <div className="flex-col">
                  <h2>{offcard?.info?.header}</h2>
                  <p className="text-slate-300">{offcard?.info?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
