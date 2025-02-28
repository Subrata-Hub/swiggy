/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";
const useSuggestions = (query) => {
  const [suggestionData, setSuggestionData] = useState();

  const getSuggestionData = async () => {
    // setLoading(true);

    if (query) {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${LAT}&lng=${LNG}&str=${query}&includeIMItem=true`
      );
      const data = await response.json();

      setSuggestionData(data?.data);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getSuggestionData();
  }, [query]);

  return suggestionData;
};

export default useSuggestions;
