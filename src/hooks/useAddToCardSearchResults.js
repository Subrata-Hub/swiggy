import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useAddToCardSearchResults = (
  suggestionText,
  setLoading,
  resId,
  menuId
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
      // console.log(data);
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
