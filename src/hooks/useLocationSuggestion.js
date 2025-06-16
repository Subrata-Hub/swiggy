/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const useLocationSuggestion = (input) => {
  const [locationSuggestion, setLocationSuggestion] = useState([]);

  const getSuggestion = async () => {
    if (input || input !== "") {
      const response = await fetch(
        BASE_URL +
          `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${input}&types=`
      );
      const suggestionData = await response.json();

      setLocationSuggestion(suggestionData?.data);
    } else {
      setLocationSuggestion([]);

      return;
    }
  };

  useEffect(() => {
    getSuggestion();
  }, [input]);

  return locationSuggestion;
};

export default useLocationSuggestion;
