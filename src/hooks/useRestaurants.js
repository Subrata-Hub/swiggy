/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
// import { LAT, LNG } from "../utils/constant";

const useRestaurants = (setLoading, LAT, LNG) => {
  const [resData, setResData] = useState([]);

  const getResData = async () => {
    setLoading(true);

    if (LAT && LNG) {
      const response = await fetch(
        BASE_URL +
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&page_type=DESKTOP_WEB_LISTING`
      );
      const data = await response.json();

      setResData(data?.data?.cards);
      setLoading(false);
    }
  };
  useEffect(() => {
    getResData();
  }, [LAT, LNG]);

  return resData;
};

export default useRestaurants;

// 22.5743545
// 88.3628734
// 22.723616
// 88.350805
