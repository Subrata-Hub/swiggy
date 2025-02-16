import { useEffect, useState } from "react";

const useRestaurants = () => {
  const [resData, setResData] = useState([]);

  const getResData = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&page_type=DESKTOP_WEB_LISTING`
      );
      const data = await response.json();

      console.log(data?.data.cards);
      setResData(data?.data?.cards);
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
