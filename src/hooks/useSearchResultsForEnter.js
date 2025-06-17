/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL, MOBILE_BASE_URL } from "../utils/constant";

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
        `${
          window.innerWidth > 640 ? BASE_URL : MOBILE_BASE_URL
        }/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionTextForEnter}&submitAction=ENTER`
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
