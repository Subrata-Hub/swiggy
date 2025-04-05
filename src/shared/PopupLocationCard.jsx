import { useState } from "react";
import useLocationSuggestion from "../hooks/useLocationSuggestion";
import { HiMapPin, HiMiniXMark } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const PopupLocationCard = ({
  userLocationData,
  locationRef,
  setLocationPopup,
  input,
  setInput,
}) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const suggestion = useLocationSuggestion(input);

  const userData = useSelector((store) => store.firebaseData.userData);

  const updateLocation = async (docId, updateField) => {
    try {
      setLoading(true);
      const locationRef = doc(db, "locations", docId);
      await updateDoc(locationRef, updateField);
      console.log("Document updated successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const getLocationId = async (description, place_id) => {
    setLoading(true);
    const place = {
      description: description,
      place_id: place_id,
    };

    setLocationPopup(false);

    await updateLocation(userData?.uid, {
      ...userLocationData,

      place: place,
    });

    setInput("");

    setLoading(false);

    navigate("/");
  };

  const getCurrentAddress = async (latlngStr) => {
    if (latlngStr) {
      setInput("Fetching your current Location");
      setLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${latlngStr}`
      );
      const suggestionData = await response.json();
      if (!suggestionData) return;

      // setCurrentAddress(suggestionData?.data);

      const user = auth?.currentUser?.uid;

      const currentAddress = suggestionData?.data;

      console.log(currentAddress);

      if (currentAddress && currentAddress?.length > 0) {
        await updateLocation(user, {
          ...userLocationData,

          address: latlngStr.split("%2C").map(Number),
          latlng: {
            LAT: Number(latlngStr.split("%2C")[0]),
            LNG: Number(latlngStr.split("%2C")[1]),
          },

          place: {
            description: currentAddress?.[0]?.formatted_address,
            place_id: currentAddress?.[0]?.place_id,
          },
        });
        // setLoading(false);
      }

      setInput("");

      setLoading(false);
    }
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async function success(position) {
          const latlng = [position.coords.latitude, position.coords.longitude];
          const latlngStr = encodeURIComponent(latlng && latlng);

          console.log(latlngStr);

          await getCurrentAddress(latlngStr);
        },
        function () {
          alert("Could not get your position");
        }
      );
    }

    navigate("/");
    setLoading(false);

    setLocationPopup(false);
  };

  return (
    <div>
      <div
        className="h-full fixed top-0 left-0 bg-slate-800 w-[650px] z-5000000"
        ref={locationRef}
      >
        <div className="pt-6 pl-40" onClick={() => setLocationPopup(false)}>
          <HiMiniXMark className="text-3xl" />
        </div>
        <div className="pl-40 pt-24">
          <input
            type="text"
            value={input}
            placeholder="Search for area, Street name..."
            className="w-96 border h-14 px-5"
            onChange={(e) => setInput(e.target.value)}
          />
          {suggestion && (
            <div className="mt-6">
              {suggestion &&
                suggestion?.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div
                      className="flex gap-4 mt-4"
                      onClick={() =>
                        getLocationId(item?.description, item?.place_id)
                      }
                    >
                      <HiMapPin className="text-xl mt-0.5" />
                      <div>
                        <div className="font-[500] text-[16px]">
                          {item?.structured_formatting?.main_text}
                        </div>
                        <div className="font-light text-[14px]">
                          {item?.structured_formatting?.secondary_text}
                        </div>
                      </div>
                    </div>
                    <div className="w-96 h-[1px] bg-slate-600 mt-2"></div>
                  </div>
                ))}
            </div>
          )}
          {(suggestion.length === 0 || !loading) && (
            <div className="mt-13 w-96">
              <div className="flex gap-4 mt-4 border p-4">
                <HiMapPin className="text-xl mt-0.5" />
                <div>
                  <div className="font-[500] text-[16px]" onClick={getPosition}>
                    Get Current Location
                  </div>
                  <div className="font-light text-[14px]">Using GPS</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupLocationCard;
