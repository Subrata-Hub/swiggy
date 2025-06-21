/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { BASE_URL, MOBILE_BASE_URL } from "../utils/constant";

const useSearchResults = (query, setLoading, LAT, LNG, submitAction) => {
  const [searchData, setSearchData] = useState();

  const getSearchData = async () => {
    setLoading(true);
    if (query && query !== "") {
      const response = await fetch(
        `${
          window.innerWidth > 640 ? BASE_URL : MOBILE_BASE_URL
        }/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${query}&submitAction=${submitAction}`
      );
      const data = await response.json();

      setSearchData(data?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [query, submitAction]);

  return searchData;
};

export default useSearchResults;
