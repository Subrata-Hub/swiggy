import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../utils/firebase";

async function deleteMenutem(documentId) {
  try {
    const docRef = doc(db, "cart", documentId);
    await deleteDoc(docRef);

    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      cart: arrayRemove(documentId),
    });
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

export default deleteMenutem;
