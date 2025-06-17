/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL, MOBILE_BASE_URL } from "../utils/constant";

const useRestaurantsDetails = (restaurantId, setLoading, LAT, LNG) => {
  const [resDetailsData, setResDetailsData] = useState([]);

  const getResDetailsData = async () => {
    setLoading(true);
    if (LAT && LNG) {
      const response = await fetch(
        `${
          window.innerWidth > 640 ? BASE_URL : MOBILE_BASE_URL
        }/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`
      );

      const data = await response.json();

      setResDetailsData(data?.data?.cards);
      setLoading(false);
    }
  };

  useEffect(() => {
    getResDetailsData();
  }, [restaurantId, LAT, LNG]);

  return resDetailsData;
};

export default useRestaurantsDetails;
