import { useEffect, useState } from "react";

const useMenuSearchResult = () => {
  const [menuSearchResultData, setMenuSearchResultData] = useState("");

  // console.log(query);

  const getMenuSearchResultData = async () => {
    const responce = await fetch(
      `https://www.swiggy.com/dapi/menu/pl/search?lat=22.723616&lng=88.350805&restaurantId=21614&query=chicken&submitAction=ENTER`
    );
    const data = await responce.json();

    setMenuSearchResultData(data);
  };

  useEffect(() => {
    getMenuSearchResultData();
  }, []);

  return menuSearchResultData;
};

export default useMenuSearchResult;
