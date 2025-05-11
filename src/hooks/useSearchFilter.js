/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

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

  const getSearchData = async () => {
    if (!isReSetStore && selectedOption && suggestionText !== "") {
      setLoading(true);

      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION&facets=${facets}
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
