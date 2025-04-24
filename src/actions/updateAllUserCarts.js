import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const updateAllUserCarts = async (oldUserId, newUserId) => {
  const cartsCollectionRef = collection(db, "cart");
  const q = query(cartsCollectionRef, where("userId", "==", oldUserId));
  const querySnapshot = await getDocs(q);

  const updatedPromises = [];
  querySnapshot.forEach((docSnapshot) => {
    const cartDocRef = doc(db, "cart", docSnapshot.id);
    updatedPromises.push(
      updateDoc(cartDocRef, {
        userId: newUserId,
      })
    );
  });

  await Promise.all(updatedPromises);
};

export default updateAllUserCarts;
