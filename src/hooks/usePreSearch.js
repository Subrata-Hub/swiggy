import { useEffect, useState } from "react";
import { LAT, LNG } from "../utils/constant";

const usePreSearch = () => {
  const [preSearchData, setPreSearchData] = useState([]);

  const getPreSearchData = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${LAT}&lng=${LNG}`
    );
    const data = await response.json();

    setPreSearchData(data?.data);
  };

  useEffect(() => {
    getPreSearchData();
  }, []);

  return preSearchData;
};

export default usePreSearch;
