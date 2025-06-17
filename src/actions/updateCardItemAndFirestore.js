import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateCardItems } from "../utils/cartSlice";
import { db } from "../utils/firebase";

const updateCardItemAndFirestore =
  (item, action, cartId, coustomizedItems, selectedAddons) =>
  async (dispatch) => {
    dispatch(
      updateCardItems({
        ...item,
        action,
        cartId,
        coustomizedItems,
        selectedAddons,
      })
    ); // Dispatch the synchronous Redux update

    if (cartId) {
      const cartRef = doc(db, "cart", cartId);
      try {
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          if (action === "update") {
            await updateDoc(cartRef, {
              cartItems: item,
              totalMenuItems: item.totalMenuItems, // Use the updated item count

              addonsList: coustomizedItems || [],
              selectedAddons: selectedAddons || {},
            });
          } else {
            await updateDoc(cartRef, {
              cartItems: item,
              totalMenuItems: item.totalMenuItems, // Use the updated item count

              addonsList: coustomizedItems || [],
              selectedAddons: selectedAddons || {},
            });
          }
        }
      } catch (error) {
        console.error("Error updating cart in Firestore:", error);
      }
    } else {
      console.warn("cartId is undefined, cannot update Firestore.");
    }
  };

export default updateCardItemAndFirestore;
