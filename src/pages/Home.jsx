import Body from "../components/Body";
import Navbar from "../components/Navbar";

const HomePage = () => {
  // const getMenuSearchResultData = async () => {
  //   const responce = await fetch(
  //     `https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.723616&lng=88.350805&str=Egg%20Roll&submitAction=SUGGESTION&facets=%7B%22SLA%22%3A%5B%7B%22id%22%3A%2240%22%2C%22operator%22%3A%22LTE%22%2C%22label%22%3A%22Fast%20Delivery%22%7D%5D%7D&selectedPLTab=DISH`
  //   );
  //   const data = await responce.json();
  //   console.log(data);
  // };

  // getMenuSearchResultData();
  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      <Body />
    </div>
  );
};

export default HomePage;
