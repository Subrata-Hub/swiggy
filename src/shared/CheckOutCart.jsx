import { useDispatch, useSelector } from "react-redux";
import { CART_IMG, getFormatedPrice } from "../utils/constant";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";

import { removeCardItems } from "../utils/cartSlice";
import deleteMenutem from "../actions/deleteMenutem";
import updateCardItemAndFirestore from "../actions/updateCardItemAndFirestore";
import { IoAdd, IoRemove } from "react-icons/io5";
import PopupCardMenu from "./PopupCardMenu";
import useOutSideClick from "../hooks/useOutsideClick";
import PopupUpdateCard from "./PopupUpdateCard";
import { CiDiscount1 } from "react-icons/ci";
import PopupCupponCart from "./PopupCupponCart";

const CheckOutCart = () => {
  // --- REFACTORED STATE ---
  // Instead of boolean flags, we store the specific item to be acted upon.
  const [itemToCustomize, setItemToCustomize] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  // You can keep these states if they are for UI logic within the popup
  const [isCustomize, setIsCustomize] = useState(false);
  const [showSelectedCustomizeItems, setShowSelectedCustomizeItems] =
    useState(false);

  const [showPopupCupponCart, setShowPopupCupponCart] = useState(false);

  const restaurantInfo = useSelector((state) => state.cart.resInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));

  const cupponCartRef = useRef(null);
  const cupponButtonRef = useRef(null);

  const menuItemCardRef = useRef(null);
  const updatePopupCardRef = useRef(null);
  // Refs for useOutSideClick might need to be attached to the popups themselves now
  // For simplicity, I've kept the logic but you might need to adjust based on final layout.

  const dispatch = useDispatch();

  const subTotal = cartItems
    ?.map((cart) => cart?.menuPrice * cart?.totalMenuItems)
    ?.reduce((acc, item) => acc + item, 0);

  const finalSubTotal = cartItems
    ?.map((cart) =>
      cart?.finalmenuPrice > 0
        ? cart?.finalmenuPrice * cart?.totalMenuItems
        : cart?.menuPrice * cart?.totalMenuItems
    )
    ?.reduce((acc, item) => acc + item, 0);

  const subTotalForUser =
    userCartItems &&
    userCartItems?.cartItems
      ?.map((item) => item?.menuPrice * item?.totalMenuItems)
      ?.reduce((acc, item) => acc + item, 0);

  const finalSubTotalForUser =
    userCartItems &&
    userCartItems?.cartItems
      ?.map((item) =>
        item?.finalmenuPrice
          ? item?.finalmenuPrice * item?.totalMenuItems
          : item?.menuPrice * item?.totalMenuItems
      )
      ?.reduce((acc, item) => acc + item, 0);

  // Custom hook can now be simplified or target the specific popup refs
  useOutSideClick(menuItemCardRef, () => setItemToCustomize(null));
  useOutSideClick(updatePopupCardRef, () => setItemToUpdate(null));

  useOutSideClick(cupponCartRef, () => setShowPopupCupponCart(false));

  const updatingCardItem = async (item, action, cartId, cart) => {
    setIsCustomize(false);
    setShowSelectedCustomizeItems(true);

    // Show update confirmation popup if item has addons and user is adding more
    if (cart?.addons?.length > 0 && action === "Add") {
      setItemToUpdate(cart); // Set the specific item to update
    } else {
      const updatedCardInfo = {
        ...cart,
        totalMenuItems: item,
      };

      dispatch(
        updateCardItemAndFirestore(
          updatedCardInfo,
          action,
          cartId,
          cart.addonsList
        )
      );

      if (item === 0) {
        dispatch(removeCardItems(updatedCardInfo));
        await deleteMenutem(cartId);
      }
    }
  };

  const handlePopupCupponCart = () => {
    setShowPopupCupponCart(true);
  };

  return (
    <div>
      {(cartItems?.length > 0 || userCartItems?.cartItems?.length > 0) && (
        <div className="w-[400px] h-auto bg-slate-900 border-2 border-slate-800 shadow-xl shadow-slate-800 relative">
          <div className="p-6">
            <div className="flex flex-col fixed z-100">
              <div className="flex gap-4">
                <div className="w-[60px] h-[60px]">
                  <img
                    src={
                      CART_IMG +
                      (restaurantInfo?.resImg ||
                        userCartItems?.cartResInfo?.resImg)
                    }
                    className="w-[60px] h-[60px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold">
                    {restaurantInfo?.restaurantName ||
                      userCartItems?.cartResInfo?.restaurantName}
                  </h1>
                  <p className="font-light text-sm">
                    {restaurantInfo?.resAreaName ||
                      userCartItems?.cartResInfo?.resAreaName}
                  </p>
                  <Link
                    to={
                      restaurantInfo?.menuURL
                        ? restaurantInfo?.menuURL
                        : userCartItems?.cartResInfo?.menuURL
                    }
                  >
                    <div className="mt-2 w-20 h-1 bg-amber-600"></div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-slate-700 mt-20"></div>

            {/* --- CART ITEMS LIST --- */}
            <div className="w-full max-h-[350px] overflow-hidden overflow-y-scroll hide-scrollbar">
              {(cartItems?.length > 0
                ? cartItems
                : userCartItems?.cartItems
              )?.map((cart) => (
                <div
                  className="flex justify-between justify-items-start items-center pt-4 gap-0"
                  key={cart?.cartId}
                >
                  <div className="flex gap-2 mr-2">
                    <div className="w-4 h-4 mt-0.5">
                      {cart?.vegClassifier === "VEG" ? (
                        <img src={veg} alt="Veg" loading="lazy" />
                      ) : (
                        <img src={nonVeg} alt="Non-Veg" loading="lazy" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[13px] whitespace-break-spaces">
                        {cart?.menuName}
                      </p>
                      {cart?.addons?.length > 0 && (
                        <span
                          className="text-[10px] cursor-pointer text-orange-400"
                          onClick={() => {
                            // --- UPDATED ONCLICK ---
                            // Set the specific item to be customized
                            setItemToCustomize(cart);
                            setIsCustomize(true);
                            setShowSelectedCustomizeItems(true);
                          }}
                        >
                          Customize
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item quantity controls... */}
                  <div className="w-[80px] flex-shrink-0 mx-2">
                    <div className="w-full h-8 bg-slate-900 text-emerald-500 rounded-xl flex items-center justify-center border-2 border-slate-700">
                      <div className="flex justify-between items-center w-full px-2">
                        <div
                          onClick={() =>
                            updatingCardItem(
                              cart?.totalMenuItems - 1,
                              "Remove",
                              cart?.cartId,
                              cart
                            )
                          }
                        >
                          <IoRemove className="text-[12px]" />
                        </div>
                        <span className="text-[12px] min-w-[15px] text-center">
                          {cart?.totalMenuItems}
                        </span>
                        <div
                          onClick={() =>
                            updatingCardItem(
                              cart?.totalMenuItems + 1,
                              "Add",
                              cart?.cartId,
                              cart
                            )
                          }
                        >
                          <IoAdd className="text-[12px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="font-light text-[13.5px] ml-1  flex-col relative">
                    <div>
                      ₹
                      {getFormatedPrice(cart?.menuPrice * cart?.totalMenuItems)}
                    </div>
                    {cart?.finalmenuPrice > 0 && (
                      <div className="w-9 h-0.5 bg-slate-200 absolute bottom-7"></div>
                    )}
                    {cart?.finalmenuPrice > 0 && (
                      <div>
                        ₹
                        {getFormatedPrice(
                          cart?.finalmenuPrice * cart?.totalMenuItems
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full p-5 border-2 border-slate-500 mb-4 mt-6">
              <div
                className="flex gap-4 items-center"
                onClick={handlePopupCupponCart}
                ref={cupponButtonRef}
              >
                <CiDiscount1 className="text-xl" />
                <p>Apply Cuppon</p>
              </div>
            </div>

            <div>
              <h2 className="text-[14px] font-semibold">Bill Details</h2>
              <div className="flex justify-between items-center ">
                <h2 className="text-[14px]">Item Total</h2>
                <div className="text-[13px] flex gap-3 relative">
                  <span>
                    ₹{getFormatedPrice(subTotal ? subTotal : subTotalForUser)}
                  </span>
                  {subTotal !== finalSubTotal && (
                    <>
                      <div className="w-9 h-[1px] bg-slate-200 absolute bottom-2"></div>
                      <span className="text-green-400">
                        ₹
                        {getFormatedPrice(
                          finalSubTotal ? finalSubTotal : finalSubTotalForUser
                        )}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-[0.5px] bg-slate-700 mt-6"></div>

            {/* Total Section (no changes here) */}
            <div className="fixed bottom-2 w-[370px]  z-1000">
              <div className="flex  h-10 bg-amber-600 justify-between items-center mt-6 -ml-6 px-4">
                <h1>TO Pay</h1>
                <div>
                  ₹
                  {getFormatedPrice(
                    finalSubTotal ? finalSubTotal : finalSubTotalForUser
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- POPUPS RENDERED OUTSIDE THE LOOP --- */}

      {/* 1. Customization Popup */}
      {itemToCustomize && (
        <>
          <div className="overlay"></div>
          <div ref={menuItemCardRef}>
            <PopupCardMenu
              searchDishesData={itemToCustomize}
              setShowMenuCardPopup={() => setItemToCustomize(null)} // Pass function to close
              resInformation={restaurantInfo}
              counter={itemToCustomize.totalMenuItems}
              resId={restaurantInfo?.restaurantId}
              menuItem={itemToCustomize}
              userMenuItem={itemToCustomize}
              isCustomize={isCustomize}
              showSelectedCustomizeItems={showSelectedCustomizeItems}
              // Pass any other necessary props
              setShowMenuCardPopupBeforeUpdate={() => {
                setItemToUpdate(null); // Close this popup
                setItemToCustomize(itemToUpdate); // Open the customize popup
              }}
            />
          </div>
        </>
      )}

      {/* 2. Update Confirmation Popup */}
      {itemToUpdate && (
        <>
          <div className="overlay"></div>
          <div ref={updatePopupCardRef}>
            <PopupUpdateCard
              setShowPopupBeforeUpdate={() => setItemToUpdate(null)} // Pass function to close
              menuInfo={itemToUpdate}
              menuItem={itemToUpdate}
              userMenuItem={itemToUpdate}
              setShowMenuCardPopupBeforeUpdate={() => {
                setItemToUpdate(null); // Close this popup
                setItemToCustomize(itemToUpdate); // Open the customize popup
              }}
            />
          </div>
        </>
      )}

      {showPopupCupponCart && (
        <>
          <div className="overlay"></div>
          <div ref={cupponCartRef}>
            <PopupCupponCart
              restaurantInfo={restaurantInfo}
              setShowPopupCupponCart={setShowPopupCupponCart}
              cart_value={getFormatedPrice(
                finalSubTotal ? finalSubTotal : finalSubTotalForUser
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CheckOutCart;
