/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useSearchResultsForEnter = (
  suggestionTextForEnter,
  setLoading,
  LAT,
  LNG,
  pathname
) => {
  const [searchData, setSearchData] = useState();

  const getSearchData = async () => {
    setLoading(true);
    // && suggestionText === ""
    if (suggestionTextForEnter && suggestionTextForEnter !== "" && pathname) {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionTextForEnter}&submitAction=ENTER`
      );
      const data = await response.json();

      setSearchData(data?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [pathname, suggestionTextForEnter]);

  return searchData;
};

export default useSearchResultsForEnter;
