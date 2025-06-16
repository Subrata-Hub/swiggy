/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const useSuggestions = (query, LAT, LNG) => {
  const [suggestionData, setSuggestionData] = useState();

  const getSuggestionData = async () => {
    // setLoading(true);

    if (query && LAT && LNG) {
      const response = await fetch(
        BASE_URL +
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

  console.log(suggestionData);

  return suggestionData;
};

export default useSuggestions;
