/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const usePreSearch = (LAT, LNG) => {
  const [preSearchData, setPreSearchData] = useState([]);

  const getPreSearchData = async () => {
    if (LAT && LNG) {
      const response = await fetch(
        `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${LAT}&lng=${LNG}`
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
