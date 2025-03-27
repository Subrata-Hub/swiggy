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
  const getCardSearchResultsData = async () => {
    setLoading(true);
    if (resId && menuId) {
      const responce = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${LAT}
                      &lng=${LNG}&str=${suggestionText}&submitAction=SUGGESTION
                      &selectedPLTab=dish-add&restaurantIdOfAddedItem=${resId}&itemAdded=${menuId}`
      );
      const data = await responce.json();

      setLoading(false);

      setCartSearchResultsData(data?.data);
    }
  };

  useEffect(() => {
    getCardSearchResultsData();
  }, [menuId]);
  return cartSearchResultsData;
};

export default useAddToCardSearchResults;
