import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

async function fetchUserCarts(userId) {
  try {
    const cartsCollectionRef = collection(db, "cart");
    const q = query(cartsCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userCarts = [];
    querySnapshot.forEach((doc) => {
      userCarts.push({ id: doc.id, ...doc.data() });
    });
    return userCarts;
  } catch (error) {
    console.error("Error fetching user carts:", error);
    return []; // Return an empty array in case of an error
  }
}

export default fetchUserCarts;
