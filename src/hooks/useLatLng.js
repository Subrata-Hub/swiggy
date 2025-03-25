/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useLatLng = (placeId) => {
  const [latLng, setLatLng] = useState([]);

  const getLatLng = async () => {
    if (placeId) {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`
      );
      const latLngData = await response.json();

      setLatLng(latLngData?.data);
    }
  };

  useEffect(() => {
    getLatLng();
  }, [placeId]);

  return latLng;
};

export default useLatLng;
