import { useState } from "react";
import useLocationSuggestion from "../hooks/useLocationSuggestion";
import { HiMapPin, HiMiniXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, addLatlng, addPlace } from "../utils/locationSlice";
import useCurrentAdress from "../hooks/useCurrentAdress";

/* eslint-disable react/prop-types */
const PopupLocationCard = ({
  locationRef,
  setLocationPopup,
  input,
  setInput,
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const latlng = useSelector((store) => store?.location?.address);

  const latlngStr = encodeURIComponent(latlng);

  const currentAddressData = useCurrentAdress(latlngStr, setLoading);

  const suggestion = useLocationSuggestion(input);

  const getLocationId = (description, place_id) => {
    dispatch(
      addPlace({
        description: description,
        place_id: place_id,
      })
    );

    setInput("");

    setLocationPopup(false);
    // navigate("/");
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          dispatch(
            addAddress([position.coords.latitude, position.coords.longitude])
          );

          dispatch(
            addLatlng({
              LAT: position?.coords?.latitude,
              LNG: position?.coords?.longitude,
            })
          );
          // setLocationPopup();
          // Now get the current address from lat/lng
          // setTimeout(() => {
          //   getCurrentAdress(); // Ensure this runs after dispatching the address
          // }, 500); // Adding a small delay to ensure state is updated first
        },
        function () {
          alert("Could not get your position");
        }
      );
    }

    // navigate("/");

    setLocationPopup(false);
  };

  const getCurrentAdress = () => {
    if (
      currentAddressData &&
      !loading &&
      (currentAddressData?.length !== 0 || currentAddressData !== undefined)
    ) {
      dispatch(
        addPlace({
          description: currentAddressData?.[0]?.formatted_address,
          place_id: currentAddressData?.[0]?.place_id,
        })
      );
      setLocationPopup(false);
    } else {
      return;
    }
  };

  // useEffect(() => {
  //   if (
  //     currentAddressData &&
  //     !loading &&
  //     (currentAddressData?.length !== 0 || currentAddressData !== undefined)
  //   ) {
  //     dispatch(
  //       addPlace({
  //         description: currentAddressData?.[0]?.formatted_address,
  //         place_id: currentAddressData?.[0]?.place_id,
  //       })
  //     );
  //   }

  // }, [currentAddressData]);

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
                  <div
                    className="font-[500] text-[16px]"
                    onClick={() => {
                      getPosition();
                      getCurrentAdress();
                    }}
                  >
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
