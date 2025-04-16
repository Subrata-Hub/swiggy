/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch } from "react-redux";
import Body from "../components/Body";
import Navbar from "../components/Navbar";
import {
  addAddress,
  addLatlng,
  // reSetLocationStore,
} from "../utils/locationSlice";
import { useEffect } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";

import { addUserData, addUserLocationData } from "../utils/firebaseDataSlice";

const HomePage = () => {
  console.log("HomePage component mounted"); // Check for multiple mounts
  const dispatch = useDispatch();

  const createNewLocationAndLinkToUser = async (userId, locationData) => {
    try {
      const locationsCollection = collection(db, "locations"); // Assuming your locations collection is named "locations"
      const newLocationDocRef = await addDoc(locationsCollection, locationData);
      const newLocationId = newLocationDocRef.id;

      // Now, update the user's document with the new location ID
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          locations: arrayUnion(newLocationId),
          // locations: arrayUnion(locationData?.place),
        });
        addUserLocationData({
          ...locationData,
          ["currentLocId"]: newLocationId,
        });
      } else {
        console.error(
          `User document with ID "${userId}" not found. Cannot link location.`
        );
        // setLoading(false);
        return null; // Or throw an error
      }

      console.log("New location created and linked to user successfully!");
      return newLocationId;
    } catch (error) {
      console.error("Error creating location and linking to user:", error);
      throw error;
    }
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (auth?.currentUser) {
            const initialLocData = {
              userId: auth?.currentUser?.uid,
              locations: [],
              place: {},
              latlng: {
                LAT: position.coords.latitude,
                LNG: position.coords.longitude,
              },

              address: [position.coords.latitude, position.coords.longitude],
            };

            await createNewLocationAndLinkToUser(
              auth?.currentUser?.uid,
              initialLocData
            );
            localStorage.setItem(
              "InitialLocation",
              JSON.stringify(initialLocData)
            );
          }

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
          const locationData =
            JSON.parse(localStorage.getItem(`locations`)) || [];
          const anonymousUserCredential = await signInAnonymously(auth);
          const anonymousUid = anonymousUserCredential.user.uid;
          localStorage.setItem("anonymousUid", anonymousUid);
          console.log("Signed in anonymously. New UID:", anonymousUid);

          const userDocRef = doc(db, "users", anonymousUid);
          const docSnap = await getDoc(userDocRef);

          if (!docSnap.exists()) {
            await setDoc(userDocRef, {
              // email: "",
              // name: "",
              locations: locationData,
              cart: [],
              search: [],
              uid: anonymousUid,
              isAnonymous: true,
            });

            dispatch(
              addUserData({
                locations: locationData,
                cart: [],
                search: [],
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

        const initialLocation = JSON.parse(
          localStorage.getItem("InitialLocation")
        );

        const currentLocation = JSON.parse(
          localStorage.getItem("current_location")
        );
        if (!initialLocation && !currentLocation) {
          getPosition();
          console.log("Initial location");
        }
      }
    });
    return () => unSubcribeAuth(); // Cleanup the listener
  }, []);

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
