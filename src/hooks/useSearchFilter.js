/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useSearchFilter = (suggestionText, searchResultsType, facets) => {
  const [searchData, setSearchData] = useState({});

  // const dispatch = useDispatch();
  const getSearchData = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION&facets=${facets}
      &sortKey=NONE&selectedPLTab=${searchResultsType}`
    );

    const data = await response.json();

    setSearchData(data?.data);
  };

  useEffect(() => {
    getSearchData();
  }, [facets]);

  return searchData;
};

export default useSearchFilter;
