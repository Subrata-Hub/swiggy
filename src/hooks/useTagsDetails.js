/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const useTagsDetails = (collectionId, tagName) => {
  const [tagsDetailsData, setTagsDetailsData] = useState([]);

  const getTagDetailsData = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&collection=${collectionId}&tags=layout_CCS_${tagName}&sortBy=&filters=&type=rcv2`
    );
    const data = await response.json();

    setTagsDetailsData(data?.data?.cards);
  };

  useEffect(() => {
    getTagDetailsData();
  }, [collectionId, tagName]);

  return tagsDetailsData;
};

export default useTagsDetails;
