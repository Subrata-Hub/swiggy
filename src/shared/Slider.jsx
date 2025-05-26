/* eslint-disable react/prop-types */
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const Slider = ({ nextSlide, previousSlide, currentSlide, maxSlide }) => {
  return (
    <div className="hidden sm:flex justify-between gap-4">
      <button
        disabled={currentSlide === 0}
        onClick={() => previousSlide()}
        className={`px-2 py-2 ${
          currentSlide === 0 ? "bg-slate-700" : "bg-slate-800"
        }  rounded-full`}
      >
        <HiArrowLeft className={`text-[17px]`} />
      </button>

      <button
        disabled={currentSlide === maxSlide}
        onClick={() => nextSlide()}
        className={`px-2 py-2 ${
          currentSlide === maxSlide ? "bg-slate-700" : "bg-slate-800"
        }  rounded-full`}
      >
        <HiArrowRight className={`text-[17px] `} />
      </button>
    </div>
  );
};

export default Slider;
