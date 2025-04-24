import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const createCartAndLinkToUser = async (userId, cartItemInfo) => {
  const cartCollection = collection(db, "cart");
  const newCartDocRef = await addDoc(cartCollection, cartItemInfo);
  const newCartId = newCartDocRef.id;
  console.log(newCartId);

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // Now, update the user's document with the new location ID
    // await updateUserDataWithNewLocation(userId, newLocationId);

    await updateDoc(userRef, {
      cart: arrayUnion(newCartId),
    });
  }

  return newCartId;
};

export default createCartAndLinkToUser;
