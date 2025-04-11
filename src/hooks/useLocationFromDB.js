import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUserLocationData } from "../utils/firebaseDataSlice";

const useLocationFromDB = (uid) => {
  const [userLocationData, setUserLocationData] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (uid !== null && uid) {
      const userLocationCollectionRef = collection(db, "locations");
      const q = query(userLocationCollectionRef, where("locuid", "==", uid));

      const userLocationSubcription = onSnapshot(
        q,
        (snapshot) => {
          snapshot.forEach((doc) => {
            console.log("Current user location data:", doc.data());

            setUserLocationData(doc.data());
            dispatch(addUserLocationData(doc.data()));
          });
          if (snapshot.empty) {
            console.log("No user location data found for UID:", uid);
          }
        },
        (error) => {
          console.error("Error fetching user location data:", error);
        }
      );
      return () => userLocationSubcription();
    } else {
      return;
    }
  }, [uid, dispatch]);

  return userLocationData;
};

export default useLocationFromDB;
