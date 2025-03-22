/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useRestaurants = (setLoading) => {
  const [resData, setResData] = useState([]);

  const getResData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&page_type=DESKTOP_WEB_LISTING`
      );
      const data = await response.json();

      setResData(data?.data?.cards);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResData();
  }, []);

  return resData;
};

export default useRestaurants;

// 22.5743545
// 88.3628734
// 22.723616
// 88.350805
