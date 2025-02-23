/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useSearchResults = (query) => {
  const [searchData, setSearchData] = useState();

  // const dispatch = useDispatch();
  const getSearchData = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${query}&submitAction=SUGGESTION`
    );
    const data = await response.json();
    // if (!data) return {};

    setSearchData(data?.data);
  };

  useEffect(() => {
    getSearchData();
  }, [query]);

  return searchData;
};

export default useSearchResults;
