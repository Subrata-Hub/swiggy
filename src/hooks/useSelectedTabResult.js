/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useSelectedTabResult = (
  suggestionText,
  searchResultsType,
  isSelected
) => {
  const [searchData, setSearchData] = useState({});
  // const dispatch = useDispatch();
  const getSearchData = async () => {
    if (isSelected && searchResultsType !== "CUISINE") {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION&selectedPLTab=${searchResultsType}`
      );

      const data = await response.json();

      // if (!data) return {};

      setSearchData(data?.data);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [isSelected, searchResultsType]);

  return searchData;
};

export default useSelectedTabResult;
