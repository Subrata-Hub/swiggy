/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const useAddToCardSearchResults = (
  suggestionText,
  setLoading,
  resId,
  menuId,
  LAT,
  LNG
) => {
  const [cartSearchResultsData, setCartSearchResultsData] = useState();

  const getCardSearchResultsData = async () => {
    if (resId && menuId) {
      setLoading(true);
      const responce = await fetch(
        `${BASE_URL}/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION&selectedPLTab=dish-add&restaurantIdOfAddedItem=${resId}&itemAdded=${menuId}`
      );
      const data = await responce.json();

      setCartSearchResultsData(data?.data);
      setLoading(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    getCardSearchResultsData();
  }, [menuId]);
  return cartSearchResultsData;
};

export default useAddToCardSearchResults;
