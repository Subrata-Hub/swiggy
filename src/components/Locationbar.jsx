/* eslint-disable react-hooks/exhaustive-deps */
import { HiChevronDown } from "react-icons/hi";
import useOutSideClick from "../hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import PopupLocationCard from "../shared/PopupLocationCard";
import { useDispatch, useSelector } from "react-redux";
import useLatLng from "../hooks/useLatLng";
import { addLatlng } from "../utils/locationSlice";

const Locationbar = () => {
  const [locationPopup, setLocationPopup] = useState(false);
  const [input, setInput] = useState("");

  const locationRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  useOutSideClick(locationRef, () => setLocationPopup(false), buttonRef);
  const place = useSelector((store) => store?.location?.place);

  const latlangData = useLatLng(place?.place_id);

  const latlang = latlangData?.[0]?.geometry?.location;

  useEffect(() => {
    dispatch(
      addLatlng({
        // LAT: `${latlang && latlang?.lat}`,
        // LNG: `${latlang && latlang?.lng}`,

        LAT: latlang && latlang?.lat,
        LNG: latlang && latlang?.lng,
      })
    );
  }, [latlang]);

  return (
    <>
      <div
        className="pr-[350px] ml-6 cursor-pointer"
        onClick={() => setLocationPopup(true)}
        ref={buttonRef}
        role="button"
      >
        {/* <input
          type="text"
          value={`${place.description}`}
          placeholder={`${place.description}`}
          className="w-48"
          onChange={}
        /> */}
        <div className="flex justify-center items-center gap-1 w-[300px] h-10">
          <p className="font-semibold mr-1">Others</p>
          <div className="text-[14px] font-light truncate">
            {place?.description}
          </div>

          <span>
            {" "}
            <HiChevronDown className="text-2xl" />
          </span>
        </div>
      </div>
      {locationPopup && (
        <div>
          <div className="overlay"></div>
          <PopupLocationCard
            // locationPopup={locationPopup}
            locationRef={locationRef}
            setLocationPopup={setLocationPopup}
            input={input}
            setInput={setInput}
          />
        </div>
      )}
    </>
  );
};

export default Locationbar;
