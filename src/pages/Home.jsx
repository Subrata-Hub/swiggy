import Body from "../components/Body";
import Navbar from "../components/Navbar";

const HomePage = () => {
  // const getMenuSearchResultData = async () => {
  //   const responce = await fetch(
  //     `https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.723616&lng=88.350805&str=Pizza&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=%2Fcity%2Fkolkata%2Fpastas-by-pizza-hut-gt-road-uttarpara-rest831285%3Fquery%3DPizza&restaurantIdOfAddedItem=831285&itemAdded=136567674`
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
