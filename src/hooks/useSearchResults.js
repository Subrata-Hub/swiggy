/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useSearchResults = (query, setLoading) => {
  const [searchData, setSearchData] = useState();

  const getSearchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${query}&submitAction=SUGGESTION`
    );
    const data = await response.json();

    setSearchData(data?.data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchData();
  }, [query]);

  return searchData;
};

export default useSearchResults;
