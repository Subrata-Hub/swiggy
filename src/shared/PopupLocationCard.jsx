import { useState } from "react";
import useLocationSuggestion from "../hooks/useLocationSuggestion";
import { HiMapPin, HiMiniXMark } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUserLocationData } from "../utils/firebaseDataSlice";
import Spineer from "./Spineer";
import RecentLocationSearchCart from "./RecentLocationSearchCart";
// import { arrayUnion } from "firebase/firestore/lite";

/* eslint-disable react/prop-types */
const PopupLocationCard = ({
  locationRef,
  setLocationPopup,
  // input,
  // setInput,
}) => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const suggestion = useLocationSuggestion(input);

  const userData = useSelector((store) => store?.firebaseData?.userData);

  // const updateUserDataWithNewLocation = async (userId, newLocationId) => {
  //   const userRef = doc(db, "users", userId);
  //   await updateDoc(userRef, {
  //     locations: arrayUnion(newLocationId),
  //   });
  // };

  const createNewLocationAndLinkToUser = async (userId, locationData) => {
    try {
      const locationsCollection = collection(db, "locations"); // Assuming your locations collection is named "locations"
      const newLocationDocRef = await addDoc(locationsCollection, locationData);
      const newLocationId = newLocationDocRef.id;

      console.log(newLocationId);

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Now, update the user's document with the new location ID
        // await updateUserDataWithNewLocation(userId, newLocationId);

        await updateDoc(userRef, {
          locations: arrayUnion(locationData.place),
        });

        dispatch(
          addUserLocationData({
            ...locationData,
            ["currentLocId"]: newLocationId,
          })
        );
      } else {
        console.error(
          `User document with ID "${userId}" not found. Cannot link location.`
        );
        // setLoading(false);
        return null; // Or throw an error
      }

      console.log("New location created and linked to user successfully!");

      return newLocationId;
    } catch (error) {
      console.error("Error creating location and linking to user:", error);
      throw error;
    }
  };

  // const updateLocation = async (docId, updateField) => {
  //   try {
  //     setLoading(true);
  //     const locationRef = doc(db, "locations", docId);
  //     console.log(locationRef);
  //     await updateDoc(locationRef, updateField);
  //     dispatch(addUserLocationData(updateField));
  //     console.log("Document updated successfully!");
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error updating document:", error);
  //   }
  // };

  const getLatLng = async (placeId) => {
    if (placeId) {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`
      );
      const latLngData = await response.json();

      return latLngData?.data;
    }
    return null;
  };

  const getLocationId = async (description, place_id) => {
    setLoading(true);

    const data = await getLatLng(place_id);
    if (!data || data.length === 0) {
      setLoading(false);
      return;
    }

    const location = data[0];
    const latlang = location?.geometry?.location;
    console.log(location);

    const place = {
      description: description,
      place_id: place_id,
    };

    let latlng;
    if (latlang?.lat != null && latlang?.lng != null) {
      latlng = {
        LAT: Number(latlang.lat),
        LNG: Number(latlang.lng),
      };
    }

    const address_components = location?.address_components;

    const updatePayload = {
      // ...userLocationData,
      userId: userData !== null && userData?.uid,
      place,
    };

    if (latlng) {
      updatePayload.latlng = latlng;
    }

    if (address_components) {
      updatePayload.address_components = address_components;
    }

    // await updateLocation(
    //   userData !== undefined && userData?.uid,
    //   updatePayload
    // );

    await createNewLocationAndLinkToUser(
      userData !== null && userData?.uid,
      updatePayload
    );

    setInput("");

    setLoading(false);
    setLocationPopup(false);
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

      const user = userData?.uid;

      const currentAddress = suggestionData?.data;

      console.log(currentAddress);

      if (currentAddress && currentAddress?.length > 0) {
        await createNewLocationAndLinkToUser(user, {
          // ...userLocationData,

          address: latlngStr.split("%2C").map(Number),
          latlng: {
            LAT: Number(latlngStr.split("%2C")[0]),
            LNG: Number(latlngStr.split("%2C")[1]),
          },

          place: {
            description: currentAddress?.[0]?.formatted_address,
            place_id: currentAddress?.[0]?.place_id,
          },

          address_components: currentAddress?.[0]?.address_components,
        });
        // setLoading(false);
      }
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

          setInput("");

          // setLoading(false);
        },
        function () {
          alert("Could not get your position");
        }
      );
    }

    setLoading(false);

    setLocationPopup(false);

    navigate("/");
  };

  return (
    <div>
      <div
        className="h-full fixed top-0 left-0 bg-slate-800 w-full sm:w-[450px] md:w-[550px] lg:w-[630px] z-[2316136] overflow-y-auto hide-scrollbar"
        ref={locationRef}
      >
        <div
          className="pt-4 sm:pt-6 pl-2 sm:pl-6 md:pl-14 lg:pl-40"
          onClick={() => setLocationPopup(false)}
        >
          <HiMiniXMark className="text-3xl" />
        </div>
        <div className="pl-4 sm:pl-6 md:pl-20 lg:pl-40 pt-4 sm:pt-16">
          <input
            type="text"
            value={input}
            placeholder="Search for area, Street name..."
            className="w-full sm:w-96 border h-14 px-5"
            onChange={(e) => setInput(e.target.value)}
          />

          {loading && !suggestion ? (
            <Spineer loading={loading} />
          ) : (
            <>
              <div>
                {suggestion && (
                  <div className="mt-6">
                    {suggestion &&
                      suggestion?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4">
                          <div
                            className="flex gap-4 mt-4 cursor-pointer"
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
              </div>

              <div>
                {suggestion.length === 0 && (
                  <div className="mt-13 w-full sm:w-96">
                    <div className="flex gap-4 mt-4 border p-4">
                      <HiMapPin className="text-xl mt-0.5" />
                      <div>
                        <div
                          className="font-[500] text-[16px] cursor-pointer"
                          onClick={getPosition}
                        >
                          Get Current Location
                        </div>
                        <div className="font-light text-[14px]">Using GPS</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {suggestion.length === 0 && (
            <RecentLocationSearchCart getLocationId={getLocationId} />
          )}
          {/* <div className="mt-6 w-96 mb-10">
            
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PopupLocationCard;
