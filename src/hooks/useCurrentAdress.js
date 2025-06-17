/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const useCurrentAdress = (latLng, setLoading) => {
  const [currentAddress, setCurrentAdress] = useState([]);

  const getCurrentAddress = async () => {
    setLoading(true);

    if (latLng) {
      const response = await fetch(
        `${BASE_URL}/misc/address-recommend?latlng=${latLng}`
      );
      const suggestionData = await response.json();
      if (!suggestionData) return;

      setCurrentAdress(suggestionData?.data);

      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentAddress();
  }, [latLng]);

  return currentAddress;
};

export default useCurrentAdress;
