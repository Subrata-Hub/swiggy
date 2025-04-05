/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { HiChevronDown } from "react-icons/hi";
import useOutSideClick from "../hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import PopupLocationCard from "../shared/PopupLocationCard";

import useLatLng from "../hooks/useLatLng";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";

const Locationbar = ({ userLocationData }) => {
  const [locationPopup, setLocationPopup] = useState(false);
  const [input, setInput] = useState("");
  const userData = useSelector((store) => store.firebaseData.userData);

  const locationRef = useRef(null);
  const buttonRef = useRef(null);

  useOutSideClick(locationRef, () => setLocationPopup(false), buttonRef);

  const latlangData = useLatLng(userLocationData?.place?.place_id);
  console.log(latlangData);

  const latlang =
    (latlangData !== undefined || latlangData.length > 0) &&
    latlangData?.[0]?.geometry?.location;
  console.log(latlang);

  const updateLocation = async (docId, updateField) => {
    try {
      const locationRef = doc(db, "locations", docId);
      await updateDoc(locationRef, updateField);
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  useEffect(() => {
    if (
      userData !== undefined &&
      latlang?.lat !== null &&
      latlang?.LNG !== null
    )
      updateLocation(userData?.uid, {
        ...userLocationData,
        latlng: { LAT: Number(latlang?.lat), LNG: Number(latlang?.lng) },
      });
  }, [latlang]);

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
