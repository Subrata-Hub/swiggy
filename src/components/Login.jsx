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
import { onAuthStateChanged } from "firebase/auth";
import { HiMiniXMark } from "react-icons/hi2";

const Login = ({ setShowLoginPopup, logInRef, setShowProfileCard }) => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // console.log(email.current.value);
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getInputsData = async () => {
    try {
      if (!isSignIn) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;
        console.log(user);

        await updateProfile(user, {
          displayName: name?.current?.value,
        });

        // Wait a moment before accessing auth.currentUser
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // const updatedUser = auth.currentUser;

        onAuthStateChanged(auth, (updatedUser) => {
          if (updatedUser) {
            const { uid, email, displayName } = updatedUser;
            const userDocRef = doc(db, "users", uid);
            setDoc(userDocRef, {
              uid,
              email,
              name: displayName,
            });
          }
        });
        console.log("User signed up and data stored:", user);
        setIsSignIn(true);
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        // const user = signINUserCadential.user;
        await new Promise((resolve) => setTimeout(resolve, 1000));

        onAuthStateChanged(auth, (updatedUser) => {
          if (updatedUser) {
            const { uid, email, displayName } = updatedUser;
            const userDocRef = doc(db, "users", uid);
            setDoc(userDocRef, {
              uid,
              email,
              name: displayName,
            });
          }
        });
        console.log("Sign In User");
        setShowLoginPopup(false);
        setShowProfileCard(false);
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
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
                  <p onClick={() => setIsSignIn(!isSignIn)} className="mt-4">
                    or{" "}
                    <span className="text-orange-300">create an account</span>
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl">Sign Up</h1>
                  <p onClick={() => setIsSignIn(!isSignIn)} className="mt-4 ">
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
