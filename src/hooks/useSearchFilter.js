/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { BASE_URL, MOBILE_BASE_URL } from "../utils/constant";

const useSearchFilter = (
  suggestionText,
  searchResultsType,
  facets,
  selectedOption,
  setLoading,
  isReSetStore,
  LAT,
  LNG
) => {
  const [searchData, setSearchData] = useState({});

  // const isFillBtn = useSelector((store) => store?.search?.isFillBtnSelected);

  console.log(facets, isReSetStore);

  const getSearchData = async () => {
    if ((!isReSetStore || selectedOption) && suggestionText !== "") {
      setLoading(true);

      const response = await fetch(
        `${
          window.innerWidth > 640 ? BASE_URL : MOBILE_BASE_URL
        }/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION&facets=${facets}
            &sortKey=${selectedOption}&selectedPLTab=${searchResultsType}`
      );

      const data = await response.json();

      setSearchData(data?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [facets, selectedOption]);

  return searchData;
};

export default useSearchFilter;
