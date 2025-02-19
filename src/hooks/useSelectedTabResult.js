/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useSelectedTabResult = (query, selectedTab) => {
  const [searchData, setSearchData] = useState();
  const getSearchData = async () => {
    if (selectedTab) {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${query}&submitAction=SUGGESTION&selectedPLTab=${
          selectedTab && selectedTab
        }`
      );

      const data = await response.json();

      setSearchData(data?.data);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [query, selectedTab]);

  return searchData;
};

export default useSelectedTabResult;
