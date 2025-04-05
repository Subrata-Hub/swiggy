/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { LOGIN_IMG } from "../utils/constant";
import {
  createUserWithEmailAndPassword,
  linkWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { HiMiniXMark } from "react-icons/hi2";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { useDispatch } from "react-redux";

const Login = ({ setShowLoginPopup, logInRef, handleContineueafterSignIn }) => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // console.log(email.current.value);
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const dispatch = useDispatch()

  const getInputsData = async () => {
    try {
      let userCredential;
      if (!isSignIn) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        await updateProfile(userCredential.user, {
          displayName: name?.current?.value,
        });

        const userDocRef = doc(db, "users", userCredential.user.uid);

        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          name: name?.current?.value,
          email: email.current.value,
        });

        // console.log("User signed up and data stored:", user);

        setIsSignIn(true);
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        console.log("Sign In User");
        setShowLoginPopup(false);
        handleContineueafterSignIn();
      }

      const user = userCredential.user;
      console.log(user);

      const anonymousUid = localStorage.getItem("anonymousUid");
      if (anonymousUid) {
        const anonymousUser = await auth.signInAnonymously(); // Sign in with the old anonymous UID
        const credential = GoogleAuthProvider.credential(
          null,
          await anonymousUser.user.getIdToken()
        ); // Get a credential (can be any provider for linking)

        await linkWithCredential(user, credential);
        localStorage.removeItem("anonymousUid");
        console.log("Anonymous account linked!");

        // Now, you should transfer the cart and location data
        // from Redux to the newly signed-up user's Firestore document
        const locationData =
          JSON.parse(
            localStorage.getItem(`anonymous_location_${anonymousUid}`)
          ) || {};
        const cartData =
          JSON.parse(localStorage.getItem(`anonymous_cart_${anonymousUid}`)) ||
          [];

        await setDoc(doc(db, "users", user.uid), {
          ...(await getDoc(doc(db, "users", user.uid))).data(), // Merge existing data
          location: locationData,
          cart: cartData,
        });

        localStorage.removeItem(`anonymous_location_${anonymousUid}`);
        localStorage.removeItem(`anonymous_cart_${anonymousUid}`);
        // dispatch(clearCart()); // Clear Redux cart as data is now in Firestore
        // Optionally, fetch the user's data from Firestore to update Redux
      }

      // setShowLoginPopup(false);
      // handleContineueafterSignIn();
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
      className="fixed h-full top-0 right-0 w-[600px] bg-slate-800 z-[2316136]"
      ref={logInRef}
    >
      <div className="pt-10 pl-20" onClick={() => setShowLoginPopup(false)}>
        <HiMiniXMark className="text-3xl" />
      </div>
      <div className="mt-16 pl-20 w-[450px]">
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
              <img src={LOGIN_IMG} alt="Login" />
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
