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
  setShowAddToCardSearchResultsData = false,
  showAddToCardSearchResultsData,
  // goToSearchResultsPage,
  menuItem,
  userMenuItem,
  counter,
  cartItems,
  userCartItems,
  isImage,
  topPicksData,

  // isSearchResults,
}) => {
  const dispatch = useDispatch();
  const restaurantInfoFromCard = useSelector((state) => state.cart.resInfo);
  const resParamsObj = useSelector((store) => store?.search?.resParams);

  const updateCardItemAndFirestore =
    (item, action, cartId) => async (dispatch) => {
      dispatch(updateCardItems({ ...item, action, cartId })); // Dispatch the synchronous Redux update
      console.log(item);

      if (cartId) {
        const cartRef = doc(db, "cart", cartId);
        try {
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            await updateDoc(cartRef, {
              // cartItems: updatedCartItems,
              totalMenuItems: item.totalMenuItems, // Use the updated item count
            });
          }
        } catch (error) {
          console.error("Error updating cart in Firestore:", error);
          // Handle error appropriately (e.g., dispatch an error action)
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
        counter = 0;
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
        // setCounter(newCounter);

        // const tempCartId = "temp_" + Date.now();

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

        // disPatch(addCartItems(updatedCardInfo));
        dispatch(addCartItems({ ...updatedCardInfo, cartId }));
      }
    }
  };

  const updatingCardItem = async (item, action, cartId) => {
    // setCounter(item);

    const updatedCardInfo = {
      ...menuInfo,
      totalMenuItems: item, // Use the latest item count directly
      action: action,
      cartId,
    };

    // disPatch(updateCardItems(updatedCardInfo));

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
    // if (showResetCardPopup) return;
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

  // right-[156px] top-[2px]
  // absolute top-[124px] left-5
  return (
    <div
      className={`absolute ${
        isImage ? "top-[110px] sm:top-[124px]" : "top-14"
      } left-4.5 sm:left-6`}
      // className={`absolute flex justify-end ${
      //   isSearchResults ? "top-[92px] left-[156px]" : "right-[156px] top-[2px]"
      // }  `}
    >
      <div
      // className={
      //   resMenuItem?.card?.info?.imageId
      //     ? `absolute top-[124px] left-5`
      //     : `absolute top-[30px] right-5`
      // }
      >
        {counter === 0 && (
          <div ref={addonButtonRef}>
            <button
              className="px-8 sm:px-10 py-2 bg-slate-900 text-emerald-500 shadow-md rounded-xl shadow-cyan-950"
              // onClick={handleShowMenuCardPopup}
              onClick={() => {
                handleShowMenuCardPopup();
                setTimeout(() => {
                  goToSearchResultsPage(
                    resInformation?.restaurantId,
                    menuInfo?.menuId
                  );
                }, 2000); // Ensures this runs after state updates in handleShowMenuCardPopup
              }}
              ref={addResetRef}
            >
              ADD
            </button>
          </div>
        )}

        {counter >= 1 && (
          <div className="w-[100px] sm:w-[120px] h-10 bg-slate-900 text-emerald-500 rounded-xl flex items-center justify-center">
            <div className="flex justify-center items-center gap-7">
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
