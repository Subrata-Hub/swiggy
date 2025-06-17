/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const useLatLng = (placeId) => {
  const [latLng, setLatLng] = useState([]);

  const getLatLng = async () => {
    if (placeId) {
      const response = await fetch(
        `${BASE_URL}/misc/address-recommend?place_id=${placeId}`
      );
      const latLngData = await response.json();

      setLatLng(latLngData?.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    getLatLng();
  }, [placeId]);

  return latLng;
};

export default useLatLng;
