import { HiChevronDown } from "react-icons/hi";
import useOutSideClick from "../hooks/useOutsideClick";
import { useRef, useState } from "react";
import PopupLocationCard from "../shared/PopupLocationCard";

import { useSelector } from "react-redux";

const Locationbar = () => {
  const [locationPopup, setLocationPopup] = useState(false);
  // const [input, setInput] = useState("");

  const currentLocation = JSON.parse(localStorage.getItem("current_location"));

  const userLocationData = useSelector(
    (store) => store.firebaseData?.userLocationData
  );

  const locationRef = useRef(null);
  const buttonRef = useRef(null);

  useOutSideClick(locationRef, () => setLocationPopup(false), buttonRef);

  return (
    <>
      <div
        className="max-w-[300px] cursor-pointer"
        onClick={() => setLocationPopup(true)}
        ref={buttonRef}
        role="button"
      >
        <div className="flex justify-center items-center gap-1 ">
          <p className="font-semibold mr-1">Others</p>
          <div className="text-[14px] font-light truncate">
            {userLocationData?.place?.description ||
              currentLocation?.place?.description}
          </div>

          <span>
            {" "}
            <HiChevronDown className="text-2xl ml-2" />
          </span>
        </div>
      </div>
      {locationPopup && (
        <div>
          <div className="overlay"></div>
          <PopupLocationCard
            // locationPopup={locationPopup}
            // userLocationData={userLocationData}
            locationRef={locationRef}
            setLocationPopup={setLocationPopup}
            // input={input}
            // setInput={setInput}
          />
        </div>
      )}
    </>
  );
};

export default Locationbar;
