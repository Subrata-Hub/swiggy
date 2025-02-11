/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useRestaurantsDetails = (restaurantId) => {
  const [resDetailsData, setResDetailsData] = useState([]);

  const getResDetailsData = async () => {
    const response = await fetch(`
        https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`);

    const data = await response.json();

    setResDetailsData(data?.data?.cards);
  };

  useEffect(() => {
    getResDetailsData();
  }, [restaurantId]);

  return resDetailsData;
};

export default useRestaurantsDetails;
