import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const deleteAllUserCarts = async (userId) => {
  try {
    const cartsCollectionRef = collection(db, "cart");
    const q = query(cartsCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const deletePromises = [];
    querySnapshot.forEach((docSnapshot) => {
      const cartDocRef = doc(db, "cart", docSnapshot.id);
      deletePromises.push(deleteDoc(cartDocRef));
    });

    await Promise.all(deletePromises);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      cart: [],
    });
    // localStorage.removeItem("cart_items");
    console.log(`Successfully deleted all carts for user: ${userId}`);
    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting user carts:", error);
    return false; // Indicate failure
  }
};

export default deleteAllUserCarts;
