import { useSelector } from "react-redux";
import { CART_IMG } from "../utils/constant";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";

const Cart = () => {
  const [previewCard, setPreviewCard] = useState(false);

  const restaurantInfo = useSelector((state) => state.cart.resInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartNumber = useSelector((state) => state.cart.totalCardItems);

  const subTotal = cartItems
    ?.map((cart) => cart?.menuPrice * cart?.totalMenuItems)
    ?.reduce((acc, item) => acc + item, 0);

  const cartRef = useRef(null);
  // console.log(cartItems);
  return (
    <>
      <div
        className={`flex justify-center items-center gap-2 relative`}
        onMouseOver={() => setPreviewCard(true)}
        onMouseOut={() => setPreviewCard(false)}
        // onFocus={() => setPreviewCard(!previewCard)}
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
            stroke={cartNumber > 0 ? "green" : "white"}
            fill={cartNumber > 0 ? "green" : ""}
            strokeWidth="2"
            // className="hover:bg-red-500"
          />
          <text
            x="32"
            y="38"
            fontFamily="Arial, sans-serif"
            fontSize="19"
            textAnchor="middle"
            fill={"white"}
          >
            {cartNumber}
          </text>
        </svg>

        <span>Cart</span>
      </div>
      {previewCard && (
        <>
          {/* <div className="overlay"></div> */}
          {cartItems.length === 0 && (
            <div className="w-[300px] h-auto absolute top-20 right-20 z-[100000] bg-slate-900 p-10">
              <div className="flex-col justify-center items-center">
                <h1 className="text-3xl font-bold">Cart Empty</h1>
                <p className="mt-2">
                  Good food is always cooking! Go ahead, order some yummy items
                  from the menu.
                </p>
              </div>
            </div>
          )}
          {cartItems.length > 0 && (
            <div
              className="w-[400px] h-auto absolute top-20 right-20 z-[100000] bg-slate-900"
              ref={cartRef}
            >
              <div className="p-8">
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="w-[80px] h-[80px]">
                      <img
                        src={CART_IMG + restaurantInfo?.resImg}
                        className="w-[80px] h-[80px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="font-bold">
                        {restaurantInfo?.restaurantName}
                      </h1>
                      <p className="font-light">
                        {restaurantInfo?.resAreaName}
                      </p>
                      <Link to={restaurantInfo?.menuURL}>
                        <p className="mt-2">View Full Menu</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[0.5px] bg-slate-700 mt-6"></div>
                {cartItems?.map((cart, index) => (
                  <div
                    className="flex justify-between items-center mt-6"
                    key={index}
                  >
                    <div className="flex gap-4">
                      <div className="w-4 h-4 mt-0.5">
                        {cart?.vegClassifier === "VEG" ? (
                          <img src={veg} />
                        ) : (
                          <img src={nonVeg} />
                        )}
                      </div>
                      <p className="text-[14px]">
                        {cart?.menuName} <span> × {cart?.totalMenuItems}</span>
                      </p>
                    </div>
                    <div className="font-light">
                      ₹{cart?.menuPrice * cart?.totalMenuItems}
                    </div>
                  </div>
                ))}

                <div className="w-full h-[0.5px] bg-slate-700 mt-6"></div>

                <div className="flex justify-between mt-4">
                  <div className="flex flex-col">
                    <h2 className="font-semibold">Sub Total</h2>
                    <p className="font-light">Extra charges may apply</p>
                  </div>
                  <div>₹{subTotal}</div>
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
