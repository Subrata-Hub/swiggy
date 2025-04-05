import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const useUpdateLocation = async (docId, updateField) => {
  try {
    const locationRef = doc(db, "locations", docId);
    await updateDoc(locationRef, updateField);
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export default useUpdateLocation;
