import { useEffect, useState } from "react";

const useCurrentAdress = (latLng, setLoading) => {
  const [currentAddress, setCurrentAdress] = useState([]);

  const getCurrentAddress = async () => {
    setLoading(true);
    console.log(latLng);
    if (latLng) {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${latLng}`
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
