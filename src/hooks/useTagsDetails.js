/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL, MOBILE_BASE_URL } from "../utils/constant";

const useTagsDetails = (collectionId, tagName, setLoading, LAT, LNG) => {
  const [tagsDetailsData, setTagsDetailsData] = useState([]);

  const getTagDetailsData = async () => {
    setLoading(true);
    const response = await fetch(
      `${
        window.innerWidth > 640 ? BASE_URL : MOBILE_BASE_URL
      }/restaurants/list/v5?lat=${LAT}&lng=${LNG}&collection=${collectionId}&tags=layout_CCS_${tagName}&sortBy=&filters=&type=rcv2`
    );
    const data = await response.json();

    setTagsDetailsData(data?.data?.cards);
    setLoading(false);
  };

  useEffect(() => {
    getTagDetailsData();
  }, [collectionId, tagName]);

  return tagsDetailsData;
};

export default useTagsDetails;
