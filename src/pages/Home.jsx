// import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Body from "../components/Body";
import Navbar from "../components/Navbar";
import {
  addAddress,
  addLatlng,
  // reSetLocationStore,
} from "../utils/locationSlice";
// import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();

  // const getMenuSearchResultData = async () => {
  //   const responce = await fetch(
  //     `https://www.swiggy.com/dapi/misc/address-recommend?place_id=ChIJbU60yXAWrjsR4E9-UejD3_g`
  //   );
  //   const data = await responce.json();
  //   console.log(data);
  // };

  // getMenuSearchResultData();

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          dispatch(
            addAddress([position.coords.latitude, position.coords.longitude])
          );

          dispatch(
            addLatlng({
              LAT: position?.coords?.latitude,
              LNG: position?.coords?.longitude,
            })
          );
        },
        function () {
          alert("Could not get your position");
        }
      );
    }
  };

  // useEffect(() => {
  //   // dispatch(reSetLocationStore());
  //   getPosition();
  // }, [location]);

  getPosition();

  return (
    <>
      <div className="m-36 mt-0 mb-0">
        <Navbar />
        <Body />
      </div>
    </>
  );
};

export default HomePage;
