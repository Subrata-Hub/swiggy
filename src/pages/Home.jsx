import Body from "../components/Body";
import Navbar from "../components/Navbar";

const HomePage = () => {
  // const getMenuSearchResultData = async () => {
  //   const responce = await fetch(
  //     `https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.723616
  //     &lng=88.350805&str=Biryani&submitAction=SUGGESTION
  //     &selectedPLTab=dish-add&restaurantIdOfAddedItem=245188&itemAdded=61074760`
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
