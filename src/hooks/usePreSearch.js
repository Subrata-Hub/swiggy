/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const usePreSearch = (LAT, LNG) => {
  const [preSearchData, setPreSearchData] = useState([]);

  const getPreSearchData = async () => {
    if (LAT && LNG) {
      const response = await fetch(
        `${BASE_URL}/landing/PRE_SEARCH?lat=${LAT}&lng=${LNG}`
      );
      const data = await response.json();

      setPreSearchData(data?.data);
    }
  };

  useEffect(() => {
    getPreSearchData();
  }, []);

  return preSearchData;
};

export default usePreSearch;
