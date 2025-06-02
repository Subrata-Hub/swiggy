/* eslint-disable react/prop-types */
import { IoAdd, IoRemove } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import {
  addCartItems,
  addResInfo,
  removeCardItems,
  updateCardItems,
} from "../utils/cartSlice";
import createCartAndLinkToUser from "../actions/createCartAndLinkToUser";
import { toast } from "react-toastify";
import { addResParams } from "../utils/searchSlice";

const AddMenuItemToCart = ({
  resInformation,
  resMenuItem,
  menuInfo,

  addonButtonRef,
  addResetRef,
  setShowResetCardPopup,
  showMenuCardPopup,
  setShowMenuCardPopup,
  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,

  menuItem,
  userMenuItem,
  counter,
  cartItems,
  userCartItems,
  isImage,
  topPicksData,
}) => {
  const dispatch = useDispatch();
  const restaurantInfoFromCard = useSelector((state) => state.cart.resInfo);
  const resParamsObj = useSelector((store) => store?.search?.resParams);

  const updateCardItemAndFirestore =
    (item, action, cartId) => async (dispatch) => {
      dispatch(updateCardItems({ ...item, action, cartId })); // Dispatch the synchronous Redux update

      if (cartId) {
        const cartRef = doc(db, "cart", cartId);
        try {
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            await updateDoc(cartRef, {
              totalMenuItems: item.totalMenuItems, // Use the updated item count
            });
          }
        } catch (error) {
          console.error("Error updating cart in Firestore:", error);
        }
      } else {
        console.warn("cartId is undefined, cannot update Firestore.");
      }
    };

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

  const handleShowMenuCardPopup = async () => {
    if (resMenuItem?.card?.info?.addons || resMenuItem?.info?.addons) {
      if (
        cartItems.length >= 1 &&
        restaurantInfoFromCard?.restaurantId !== resInformation?.restaurantId
      ) {
        setShowResetCardPopup(true);
      } else {
        setShowMenuCardPopup(!showMenuCardPopup);
        // counter = 0;
      }
    } else {
      if (
        restaurantInfoFromCard &&
        (cartItems.length >= 1 || userCartItems?.cartItems?.length >= 1) &&
        (restaurantInfoFromCard?.restaurantId ||
          userCartItems?.resInfo?.restaurantId) !== resInformation?.restaurantId
      ) {
        setShowResetCardPopup(true);
      } else {
        const newCounter = counter + 1;

        const updatedCardInfo = {
          ...menuInfo,
          totalMenuItems: newCounter,
          // cartId: tempCartId,
        };

        const cartItemInfo = {
          cartItems: menuInfo,
          resInfo: resInformation,
          totalMenuItems: newCounter,
          userId: auth.currentUser.uid,
        };

        const cartId = await createCartAndLinkToUser(
          auth?.currentUser?.uid,
          cartItemInfo
        );

        dispatch(addResInfo(resInformation));

        dispatch(addCartItems({ ...updatedCardInfo, cartId }));

        goToSearchResultsPage(resInformation?.restaurantId, menuInfo?.menuId);
      }
    }
  };

  const updatingCardItem = async (item, action, cartId) => {
    const updatedCardInfo = {
      ...menuInfo,
      totalMenuItems: item, // Use the latest item count directly
      action: action,
      cartId,
    };

    dispatch(
      updateCardItemAndFirestore(
        { ...menuInfo, totalMenuItems: item },
        action,
        cartId
      )
    );

    if (item === 0) {
      dispatch(removeCardItems(updatedCardInfo));
      await deleteMenutem(cartId);
    }
  };

  const goToSearchResultsPage = (resId, menuId) => {
    if (
      !resMenuItem?.info?.addons &&
      !showAddToCardSearchResultsData &&
      resId &&
      menuId
    ) {
      dispatch(
        addResParams({
          resId: resId,
          menuId: menuId,
        })
      );

      setShowAddToCardSearchResultsData(true);

      toast(`Add item to the card from ${resInformation.restaurantName}`);
    } else if (
      showAddToCardSearchResultsData ||
      (resParamsObj?.resId && resParamsObj?.menuId)
    ) {
      return;
    }
  };

  return (
    <div
      className={`absolute ${
        isImage ? "top-[110px] sm:top-[124px]" : "top-14"
      } left-4.5 sm:left-6`}
    >
      <div>
        {counter === 0 && (
          <div ref={addonButtonRef}>
            <button
              className="px-8 sm:px-10 py-2 bg-slate-900 text-emerald-500 shadow-md rounded-xl shadow-cyan-950"
              onClick={() => {
                handleShowMenuCardPopup();
              }}
              ref={addResetRef}
            >
              ADD
            </button>
          </div>
        )}

        {counter >= 1 && (
          <div className="w-[100px] sm:w-[120px] h-10 bg-slate-900 text-emerald-500 rounded-xl flex items-center justify-center">
            <div
              className="flex justify-center items-center gap-7"
              ref={addonButtonRef}
            >
              <div
                onClick={() =>
                  updatingCardItem(
                    counter - 1,
                    "Remove",
                    menuItem?.cartId || userMenuItem?.cartId
                  )
                }
              >
                {" "}
                <IoRemove />
              </div>

              <p className=""> {counter}</p>

              <div
                className=""
                onClick={() =>
                  updatingCardItem(
                    counter + 1,
                    "Add",
                    menuItem?.cartId || userMenuItem?.cartId
                  )
                }
              >
                {" "}
                <IoAdd />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-[14px] flex justify-center items-center">
        {(resMenuItem?.card?.info?.addons || resMenuItem?.info?.addons) &&
          !topPicksData && <p className="">Customisable</p>}
      </div>
    </div>
  );
};

export default AddMenuItemToCart;
