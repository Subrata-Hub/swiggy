import { HiChevronDown } from "react-icons/hi";
import useOutSideClick from "../hooks/useOutsideClick";
import { useRef, useState } from "react";
import PopupLocationCard from "../shared/PopupLocationCard";
import useLocationFromDB from "../hooks/useLocationFromDB";
import { auth } from "../utils/firebase";

const Locationbar = () => {
  const [locationPopup, setLocationPopup] = useState(false);
  const [input, setInput] = useState("");
  const userLocationData = useLocationFromDB(auth?.currentUser?.uid);

  const locationRef = useRef(null);
  const buttonRef = useRef(null);

  useOutSideClick(locationRef, () => setLocationPopup(false), buttonRef);

  return (
    <>
      <div
        className="pr-[350px] ml-6 cursor-pointer"
        onClick={() => setLocationPopup(true)}
        ref={buttonRef}
        role="button"
      >
        <div className="flex justify-center items-center gap-1 w-[300px] h-10">
          <p className="font-semibold mr-1">Others</p>
          <div className="text-[14px] font-light truncate">
            {userLocationData?.place?.description}
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
            userLocationData={userLocationData}
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
