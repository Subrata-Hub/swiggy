/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const useSearchResults = (query, setLoading, LAT, LNG, submitAction) => {
  const [searchData, setSearchData] = useState();

  // console.log(suggestionText);

  const getSearchData = async () => {
    setLoading(true);
    if (query && query !== "") {
      const response = await fetch(
        BASE_URL +
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${query}&submitAction=${submitAction}`
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
