/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useRestaurantsDetails = (restaurantId, setLoading, LAT, LNG) => {
  const [resDetailsData, setResDetailsData] = useState([]);

  const getResDetailsData = async () => {
    setLoading(true);
    if (LAT && LNG) {
      const response = await fetch(`
        https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`);

      const data = await response.json();

      setResDetailsData(data?.data?.cards);
      setLoading(false);
    }
  };

  useEffect(() => {
    getResDetailsData();
  }, [restaurantId]);

  return resDetailsData;
};

export default useRestaurantsDetails;
