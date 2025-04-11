/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import Body from "../components/Body";
import Navbar from "../components/Navbar";
import {
  addAddress,
  addLatlng,
  // reSetLocationStore,
} from "../utils/locationSlice";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import useLocationFromDB from "../hooks/useLocationFromDB";
import useUserFromDB from "../hooks/useUserFromDB";
import { addUserData } from "../utils/firebaseDataSlice";

const HomePage = () => {
  console.log("HomePage component mounted"); // Check for multiple mounts
  const dispatch = useDispatch();
  const userData = useUserFromDB();
  // console.log(userData);
  // const userLocationData = useLocationFromDB(
  //   userData?.uid !== null && userData?.uid
  // );

  const userLocationData = useLocationFromDB(userData?.uid);
  console.log(userLocationData);
  const location = useSelector((store) => store.location);
  const search = useSelector((store) => store.search);
  const cart = useSelector((store) => store.cart);
  const config = useSelector((store) => store.config);

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            addAddress([position.coords.latitude, position.coords.longitude])
          );
          dispatch(
            addLatlng({
              LAT: position.coords.latitude,
              LNG: position.coords.longitude,
            })
          );
        },
        () => {
          alert("Could not get your position");
        }
      );
    }
  };

  const addLocationToDB = async () => {
    try {
      const user = auth?.currentUser;
      const userLocationDocRef = doc(db, "locations", user?.uid);
      const docLocationSnap = await getDoc(userLocationDocRef);
      console.log("addLocationToDB: Current user:", user?.uid);

      if (
        user &&
        location?.latlng?.LAT &&
        location?.latlng?.LNG &&
        userLocationData === undefined &&
        !docLocationSnap.exists()
      ) {
        const locationDocRef = doc(db, "locations", user?.uid);
        await setDoc(locationDocRef, { ...location, ["locuid"]: user?.uid });
        console.log("Location added to Firestore for user:", user?.uid);
      } else {
        console.log(
          "addLocationToDB: Not adding location - user:",
          !!user,
          "location:",
          location?.latlng
        );
      }
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const addToSearchDB = async () => {
    try {
      const user = auth.currentUser;
      console.log("addToSearchDB: Current user:", user?.uid);
      if (user && search && userLocationData === undefined) {
        const searchDocRef = doc(db, "search", user.uid);
        await setDoc(searchDocRef, search);
        console.log("search added to Firestore for user:", user?.uid);
      }
    } catch (error) {
      console.error("Error adding cart:", error);
    }
  };

  const addCartToDB = async () => {
    try {
      const user = auth.currentUser;
      console.log("addCartToDB: Current user:", user?.uid);
      if (user && cart && userLocationData === undefined) {
        const cartDocRef = doc(db, "cart", user.uid);
        await setDoc(cartDocRef, cart);
        console.log("cart added to Firestore for user:", user?.uid);
      }
    } catch (error) {
      console.error("Error adding search:", error);
    }
  };

  const addConfigToDB = async () => {
    try {
      const user = auth.currentUser;
      console.log("addConfigToDB: Current user:", user?.uid);
      if (user && config && userLocationData === undefined) {
        const configDocRef = doc(db, "config", user.uid);
        await setDoc(configDocRef, {
          id: user.uid, // Explicitly set the id field
          setting: config.setting,
        });
        console.log("config added to Firestore for user:", user?.uid);
      }
    } catch (error) {
      console.error("Error adding config:", error);
    }
  };

  useEffect(() => {
    const unSubcribeAuth = auth.onAuthStateChanged(async (user) => {
      const storedAnonymousUid = localStorage.getItem("anonymousUid");
      console.log(
        "onAuthStateChanged triggered. Current user:",
        user,
        "Stored anonymous UID:",
        storedAnonymousUid
      );

      if (!user && !storedAnonymousUid) {
        console.log("Attempting anonymous sign-in.");
        try {
          const anonymousUserCredential = await signInAnonymously(auth);
          const anonymousUid = anonymousUserCredential.user.uid;
          localStorage.setItem("anonymousUid", anonymousUid);
          console.log("Signed in anonymously. New UID:", anonymousUid);

          const userDocRef = doc(db, "users", anonymousUid);
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            await setDoc(userDocRef, {
              uid: anonymousUid,
              isAnonymous: true,
            });

            dispatch(
              addUserData({
                uid: anonymousUid,
                isAnonymous: true,
              })
            );
            console.log("Anonymous user document created.");
          }
        } catch (error) {
          console.error("Error signing in anonymously:", error);
        }
      } else if (user) {
        console.log("User is signed in (permanent or anonymous):", user?.uid);
        // localStorage.removeItem("anonymousUid");
      } else if (storedAnonymousUid && !user) {
        console.log(
          "Anonymous UID found in localStorage, user is null. Assuming existing anonymous session:",
          storedAnonymousUid
        );
        // You might want to fetch their data here if needed
        // getPosition();
      }

      if (user) {
        console.log(
          "User authenticated (after potential anonymous sign-in), fetching location..."
        );
        const userLocationDocRef = doc(db, "locations", user?.uid);
        const docLocationSnap = await getDoc(userLocationDocRef);
        if (
          !docLocationSnap.exists() &&
          userLocationData?.place === undefined
        ) {
          getPosition();
          console.log("Initial location");
        }
      }

      return () => unSubcribeAuth();
    });
    return () => unSubcribeAuth(); // Cleanup the listener
  }, []);

  useEffect(() => {
    const user = auth?.currentUser;

    if (
      user &&
      location?.latlng?.LAT &&
      location?.latlng?.LNG &&
      userLocationData === undefined
    ) {
      console.log(
        "useEffect for addLocationToDB triggered. User:",
        user?.uid,
        "Location:",
        location?.latlng
      );
      addLocationToDB();
    } else {
      console.log(
        "useEffect for addLocationToDB: Conditions not met - user:",
        !!user,
        "location:",
        location?.latlng
      );
    }
  }, [auth.currentUser, location?.latlng?.LAT, location?.latlng?.LNG]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && cart && userLocationData === undefined) {
      console.log(
        "useEffect for addCartToDB triggered. User:",
        user?.uid,
        "Cart items:",
        cart.cartItems.length
      );
      addCartToDB();
    }
  }, [auth.currentUser, cart]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && search && userLocationData === undefined) {
      console.log(
        "useEffect for addToSearchDB triggered. User:",
        user?.uid,
        "Search:",
        search
      );
      addToSearchDB();
    }
  }, [auth.currentUser, search]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && config && userLocationData === undefined) {
      console.log(
        "useEffect for addConfigToDB triggered. User:",
        user?.uid,
        "Config:",
        config
      );
      addConfigToDB();
    }
  }, [auth.currentUser, config]);

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
