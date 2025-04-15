/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUserLocationData } from "../utils/firebaseDataSlice";

const useLocationFromDB = (documentId, setLoading) => {
  const [userLocationData, setUserLocationData] = useState();

  const dispatch = useDispatch();

  async function getDocumentById() {
    setLoading(true);
    try {
      // Create a reference to the specific document
      const docRef = doc(db, "locations", documentId);

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && documentId) {
        console.log("Document data:", docSnap.data());
        setUserLocationData({ id: docSnap.id, ...docSnap.data() });
        dispatch(addUserLocationData({ id: docSnap.id, ...docSnap.data() }));
        localStorage.setItem(
          "current_location",
          JSON.stringify({ id: docSnap.id, ...docSnap.data() })
        );
        setLoading(false);
        return { id: docSnap.id, ...docSnap.data() }; // Return document data with its ID
      } else {
        console.log("No such document!");
        setLoading(false);
        return null; // Document doesn't exist
      }
    } catch (error) {
      console.error("Error getting document:", error);
      setLoading(false);
      return null; // Handle the error appropriately
    }
  }

  useEffect(() => {
    if (!documentId) {
      console.warn("No documentId provided to useLocationFromDB.");
      setLoading(false);
      return;
    }
    getDocumentById();
  }, [documentId, dispatch]);

  return userLocationData;
};

export default useLocationFromDB;
