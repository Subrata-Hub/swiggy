/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { CART_IMG, getFormatedPrice } from "../utils/constant";
import { useEffect, useState, useRef } from "react"; // Import useRef
import { Link } from "react-router-dom";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { addCartItems, addResInfo } from "../utils/cartSlice";

const Cart = () => {
  const [previewCard, setPreviewCard] = useState(false);

  const restaurantInfo = useSelector((state) => state.cart.resInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartNumber = useSelector((state) => state.cart.totalCardItems);

  const dispatch = useDispatch();

  const userCartItems = JSON.parse(localStorage.getItem("cart_items"));
  console.log("userCartItems from localStorage:", userCartItems);

  const subTotal = cartItems
    ?.map((cart) => cart?.menuPrice * cart?.totalMenuItems)
    ?.reduce((acc, item) => acc + item, 0);

  const subTotalForUser =
    userCartItems &&
    userCartItems?.cartItems
      ?.map((item) => item?.menuPrice * item?.totalMenuItems)
      ?.reduce((acc, item) => acc + item, 0);

  // const totalItems = userCartItems?.totalCardItems; // This might be undefined initially

  // Calculate totalItems based on the items array in localStorage
  const totalItems =
    userCartItems?.items
      ?.map((item) => item?.totalMenuItems)
      ?.reduce((acc, item) => acc + item, 0) || 0;

  // const totalItems = userCartItems?.items?.length; // If you were just counting unique items

  const cartRef = useRef(null);

  console.log("userCartItems after calculation:", userCartItems);

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

  useEffect(() => {
    const fetchCarts = async () => {
      const carts = await fetchUserCarts(auth?.currentUser?.uid);
      console.log("User's carts fetched from Firebase:", carts);
      const cartResInfo = carts?.[0]?.resInfo; // Be careful here, carts might be empty

      carts?.forEach((item) => {
        // This effect now primarily focuses on populating Redux if it's empty or on initial load
        if (!cartItems?.length && item?.cartItems) {
          dispatch(
            addCartItems({
              ...item?.cartItems,
              ["cartId"]: item?.id,
              ["totalMenuItems"]: item?.totalMenuItems,
              ["isCommingFromDB"]: true,
            })
          );
        }
      });

      if (cartResInfo && Object.keys(restaurantInfo).length === 0) {
        dispatch(addResInfo(cartResInfo));
      }

      // The totalItems displayed in the SVG is now primarily driven by localStorage
      console.log("Redux cartItems:", cartItems);
    };

    if (auth?.currentUser?.uid) {
      fetchCarts();
    }
  }, [auth?.currentUser?.uid, dispatch, cartItems?.length, restaurantInfo]); // Added dependencies

  return (
    <>
      <div
        className={`hidden sm:flex justify-center items-center gap-2 relative`}
        onMouseOver={() => setPreviewCard(true)}
      >
        <svg
          width="45"
          height="45"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="16"
            width="48"
            height="32"
            rx="6"
            ry="6"
            stroke={cartNumber || totalItems > 0 ? "green" : "white"}
            fill={cartNumber || totalItems > 0 ? "green" : ""}
            strokeWidth="2"
          />
          <text
            x="32"
            y="38"
            fontFamily="Arial, sans-serif"
            fontSize="19"
            textAnchor="middle"
            fill={"white"}
          >
            {cartNumber ? cartNumber : totalItems}
          </text>
        </svg>
        <span>Cart</span>
      </div>
      {previewCard && (
        <>
          {cartItems?.length === 0 &&
            (!userCartItems?.items || userCartItems?.items?.length === 0) && (
              <div
                className="w-[300px] h-auto fixed top-20 right-20 z-[1000000] bg-slate-900 border-4 border-slate-700 shadow-2xl p-10"
                onMouseLeave={() => setPreviewCard(false)}
              >
                <div className="flex-col justify-center items-center">
                  <h1 className="text-3xl font-bold">Cart Empty</h1>
                  <p className="mt-2">
                    Good food is always cooking! Go ahead, order some yummy
                    items from the menu.
                  </p>
                </div>
              </div>
            )}

          {(cartItems?.length > 0 || userCartItems?.items?.length > 0) && (
            <div
              className="w-[400px] h-auto absolute top-20 right-20 z-[100000] bg-slate-900 border-2 border-slate-800 shadow-xl shadow-slate-800"
              ref={cartRef}
              onMouseLeave={() => setPreviewCard(false)}
            >
              <div className="p-8">
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="w-[80px] h-[80px]">
                      <img
                        src={
                          CART_IMG +
                          (restaurantInfo?.resImg ||
                            userCartItems?.cartResInfo?.resImg)
                        }
                        className="w-[80px] h-[80px] object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="font-bold">
                        {restaurantInfo?.restaurantName ||
                          userCartItems?.cartResInfo?.restaurantName}
                      </h1>
                      <p className="font-light">
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
                        <p className="mt-2">View Full Menu</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[0.5px] bg-slate-700 mt-6"></div>
                {(cartItems.length > 0 ? cartItems : userCartItems?.items)?.map(
                  (cart, index) => (
                    <div
                      className="flex justify-between items-center mt-6"
                      key={index}
                    >
                      <div className="flex gap-4">
                        <div className="w-4 h-4 mt-0.5">
                          {cart?.vegClassifier === "VEG" ? (
                            <img src={veg} alt="Veg" loading="lazy" />
                          ) : (
                            <img src={nonVeg} alt="Non-Veg" loading="lazy" />
                          )}
                        </div>
                        <p className="text-[14px]">
                          {cart?.menuName}{" "}
                          <span> × {cart?.totalMenuItems}</span>
                        </p>
                      </div>
                      <div className="font-light">
                        ₹
                        {
                          cartItems.length > 0
                            ? getFormatedPrice(
                                cart?.menuPrice * cart?.totalMenuItems
                              )
                            : cart?.totalPrice // Assuming totalPrice exists in localStorage items
                        }
                      </div>
                    </div>
                  )
                )}

                <div className="w-full h-[0.5px] bg-slate-700 mt-6"></div>

                <div className="flex justify-between mt-4">
                  <div className="flex flex-col">
                    <h2 className="font-semibold">Sub Total</h2>
                    <p className="font-light">Extra charges may apply</p>
                  </div>
                  <div>
                    ₹{getFormatedPrice(subTotal ? subTotal : subTotalForUser)}
                  </div>
                </div>
                <div className="w-full h-10 bg-amber-600 flex justify-center items-center mt-6">
                  CHECKOUT
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
