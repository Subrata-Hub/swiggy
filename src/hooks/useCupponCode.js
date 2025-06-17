/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const useCupponCode = (LAT, LNG, resId, cart_value, setLoading) => {
  const [cupponData, setCupponData] = useState();

  const getCupponData = async () => {
    setLoading(true);
    const response = await fetch(
      `${BASE_URL}/offers/payment?lat=${LAT}&lng=${LNG}&restaurantId=${resId}&cart_value=${cart_value}&restaurant_id=${resId}`
    );
    const data = await response.json();
    setCupponData(data?.data?.cards);
    setLoading(false);
  };

  useEffect(() => {
    getCupponData();
  }, []);
  return cupponData;
};

export default useCupponCode;
