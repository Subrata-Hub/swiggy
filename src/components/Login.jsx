/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { LOGIN_IMG } from "../utils/constant";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

import { HiMiniXMark } from "react-icons/hi2";

import { useDispatch } from "react-redux";
import { addUserData, addUserLocationData } from "../utils/firebaseDataSlice";
import updateAllUserCarts from "../actions/updateAllUserCarts";

const Login = ({ setShowLoginPopup, logInRef, handleContineueafterSignIn }) => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // console.log(email.current.value);
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const getInputsData = async () => {
    try {
      let userCredential;
      const userLocationData =
        JSON.parse(localStorage.getItem(`locations`)) || {};
      if (!isSignIn) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        // await new Promise((resolve) => setTimeout(resolve, 500));

        await updateProfile(userCredential.user, {
          displayName: name?.current?.value,
        });

        const userDocRef = doc(db, "users", userCredential.user.uid);

        const cartData = JSON.parse(localStorage.getItem(`cart_items`)) || {};

        const cart = cartData?.cartItems?.map((cart) => cart?.cartId);

        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          name: name?.current?.value,
          email: email.current.value,
          locations: userLocationData,
          cart: cart,
          search: [],
        });

        dispatch(
          addUserData({
            uid: userCredential.user.uid,
            name: name?.current?.value,
            email: email.current.value,

            locations: userLocationData,
            cart: cart,
            search: [],
          })
        );

        // console.log("User signed up and data stored:", user);

        setIsSignIn(true);
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const anonymousUid = localStorage.getItem("anonymousUid");

        await updateAllUserCarts(anonymousUid, auth?.currentUser?.uid);

        const locationData =
          JSON.parse(localStorage.getItem(`current_location`)) || {};

        if (locationData !== undefined) {
          const locationDocRef = doc(db, "locations", auth?.currentUser?.uid);
          await setDoc(locationDocRef, {
            ...locationData,
            userId: auth.currentUser.uid,
          });

          dispatch(
            addUserLocationData({
              ...locationData,
              locuid: auth.currentUser.uid,
            })
          );
          // localStorage.removeItem("anonymousUid");
          // Clean up the localStorage
          localStorage.removeItem(`anonymous_location_${anonymousUid}`);
          localStorage.removeItem("anonymousUid");
        }

        console.log("Sign In User");
        setShowLoginPopup(false);
        handleContineueafterSignIn();
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  };

  const toggleFrom = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div
      className="fixed h-full top-0 right-0 w-full px-2 sm:px-0 sm:w-[450px] md:w-[550px] lg:w-[630px] bg-slate-800 z-[2316136]"
      ref={logInRef}
    >
      <div
        className="pt-10 pl-2 sm:pl-4 md:pl-20"
        onClick={() => setShowLoginPopup(false)}
      >
        <HiMiniXMark className="text-3xl" />
      </div>
      <div className="mt-16 pl-2  sm:pl-4 md:pl-20 w-full sm:w-[450px]">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-10 justify-between items-center">
            <div className="flex-col">
              {isSignIn ? (
                <>
                  <h1 className="text-2xl">LogIn</h1>
                  <p onClick={toggleFrom} className="mt-4">
                    or{" "}
                    <span className="text-orange-300">create an account</span>
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl">Sign Up</h1>
                  <p onClick={toggleFrom} className="mt-4 ">
                    or{" "}
                    <span className="text-orange-300">
                      login to your account
                    </span>
                  </p>
                </>
              )}
            </div>
            <div className="w-20 h-20 rounded-full bg">
              <img src={LOGIN_IMG} alt="Login" loading="lazy" />
            </div>
          </div>
          <div className="w-full mt-14">
            {!isSignIn && (
              <input
                ref={name}
                type="text"
                placeholder="Name"
                className="w-full h-15 border pl-4 mt-4"
              />
            )}

            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="w-full h-15 border pl-4 mt-4"
            />

            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full h-15 border pl-4 mt-4"
            />

            <button
              className="w-full mt-6 py-4 bg-amber-600"
              onClick={getInputsData}
            >
              Submit
            </button>

            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            <p className="text-[12px] mt-2">
              By creating an account, I accept the Terms & Conditions & Privacy
              Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
