/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useRestaurantsDetails = (restaurantId) => {
  const [resDetailsData, setResDetailsData] = useState([]);

  const getResDetailsData = async () => {
    const response = await fetch(`
        https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`);

    const data = await response.json();

    setResDetailsData(data?.data?.cards);
  };

  useEffect(() => {
    getResDetailsData();
  }, [restaurantId]);

  return resDetailsData;
};

export default useRestaurantsDetails;
