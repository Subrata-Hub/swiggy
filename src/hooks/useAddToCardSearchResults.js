/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useAddToCardSearchResults = (
  suggestionText,
  setLoading,
  resId,
  menuId,
  LAT,
  LNG
) => {
  const [cartSearchResultsData, setCartSearchResultsData] = useState();
  console.log(LAT, LNG);
  const getCardSearchResultsData = async () => {
    if (resId && menuId) {
      setLoading(true);
      const responce = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}&lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION&selectedPLTab=dish-add&restaurantIdOfAddedItem=${resId}&itemAdded=${menuId}`
      );
      const data = await responce.json();

      setCartSearchResultsData(data?.data);
      setLoading(false);
    } else {
      return;
    }
  };

  console.log(cartSearchResultsData);

  useEffect(() => {
    getCardSearchResultsData();
  }, [menuId]);
  return cartSearchResultsData;
};

export default useAddToCardSearchResults;
