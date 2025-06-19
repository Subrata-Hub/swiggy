/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { BASE_URL, MOBILE_BASE_URL } from "../utils/constant";

const useSelectedTabResult = (
  suggestionText,
  searchResultsType,
  isSelected,
  setLoading,
  LAT,
  LNG
) => {
  const [searchData, setSearchData] = useState({});
  // const dispatch = useDispatch();
  console.log(isSelected);
  const getSearchData = async () => {
    setLoading(true);
    if (isSelected) {
      const response = await fetch(
        `${
          window.innerWidth > 640 ? BASE_URL : MOBILE_BASE_URL
        }/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION&selectedPLTab=${searchResultsType}`
      );

      const data = await response.json();

      // if (!data) return {};

      setSearchData(data?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [isSelected, searchResultsType]);

  return searchData;
};

export default useSelectedTabResult;
