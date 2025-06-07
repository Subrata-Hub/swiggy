import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateCardItems } from "../utils/cartSlice";
import { db } from "../utils/firebase";

const updateCardItemAndFirestore =
  (item, action, cartId, coustomizedItems) => async (dispatch) => {
    dispatch(updateCardItems({ ...item, action, cartId, coustomizedItems })); // Dispatch the synchronous Redux update

    if (cartId) {
      const cartRef = doc(db, "cart", cartId);
      try {
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          await updateDoc(cartRef, {
            totalMenuItems: item.totalMenuItems, // Use the updated item count
            addonsList: coustomizedItems || [],
          });
        }
      } catch (error) {
        console.error("Error updating cart in Firestore:", error);
      }
    } else {
      console.warn("cartId is undefined, cannot update Firestore.");
    }
  };

export default updateCardItemAndFirestore;
