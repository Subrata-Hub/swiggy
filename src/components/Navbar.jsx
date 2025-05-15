import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/download.png";

import Locationbar from "./Locationbar";

import { HiOutlineSearch, HiOutlineUserCircle } from "react-icons/hi";
import Cart from "../shared/Cart";
import { useEffect, useRef, useState } from "react";
import Login from "./Login";
import useOutSideClick from "../hooks/useOutsideClick";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

import { addUserData } from "../utils/firebaseDataSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [uid, setUid] = useState(null); // State to store the UID
  const [userData, setUserData] = useState(null);

  const [showProfileCard, setShowProfileCard] = useState(false);
  const [disableOutsideClick, setDisableOutsideClick] = useState(false);

  const logInRef = useRef(null);
  const logBtnRef = useRef(null);
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

  useOutSideClick(
    logInRef,
    () => {
      if (!disableOutsideClick) {
        setShowLoginPopup(false);
      }
    },
    logBtnRef
  );
  useOutSideClick(
    profileRef,
    () => {
      if (!disableOutsideClick) {
        setShowProfileCard(false);
      }
    },
    profileBtnRef
  );

  const handleContinueClick = () => {
    setDisableOutsideClick(true);

    setTimeout(() => setDisableOutsideClick(false), 100);
  };

  useEffect(() => {
    // Use onAuthStateChanged to get the current user and their UID
    const unsubcribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        console.log("Current user UID:", user.uid);
      } else {
        setUid(null);
        console.log("No user is currently logged in.");
      }
    });

    //   // Cleanup the listener when the component unmounts
    return () => unsubcribeAuth();
  }, []);

  useEffect(() => {
    if (uid) {
      const userCollectionsRef = collection(db, "users");
      const q = query(userCollectionsRef, where("uid", "==", uid));

      const unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          snapshot.forEach((doc) => {
            console.log("Current user data:", doc.data());
            setUserData(doc.data());
            dispatch(addUserData(doc.data()));
          });

          if (snapshot.empty) {
            console.log("No user data found for UID:", uid);
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
        }
      );

      // Cleanup the snapshot listener when the component unmounts or UID changes
      return () => unsubscribeSnapshot();
    }
  }, [uid, dispatch]);

  const handleContineueafterSignIn = () => {
    setShowLoginPopup(false);
    setShowProfileCard(false);
  };

  const handleUserSignOut = async () => {
    const anonymousUid = localStorage.getItem("anonymousUid");
    // await updateAllUserCarts(auth?.currentUser?.uid, anonymousUid);

    signOut(auth)
      .then(async () => {
        setUserData(null);

        console.log("User gone");

        if (anonymousUid) {
          const userLocationData =
            JSON.parse(localStorage.getItem(`locations`)) || {};

          const userDocRef = doc(db, "users", anonymousUid);
          const cartData = JSON.parse(localStorage.getItem(`cart_items`)) || {};

          const cart = cartData?.cartItems?.map((cart) => cart?.cartId);

          updateDoc(userDocRef, {
            ...userData,
            locations: userLocationData,
            cart: cart,
          });

          const locationData =
            JSON.parse(localStorage.getItem(`current_location`)) || {};

          // await updateAllUserCarts(auth?.currentUser?.uid, anonymousUid);

          if (locationData && locationData.LAT && locationData.LNG) {
            // Ensure location is transferred to Firestore
            const locationRef = doc(db, "locations", anonymousUid);
            updateDoc(
              locationRef,
              { ...locationData, userId: anonymousUid }
              // { merge: true }
            )
              .then(() => {
                console.log(
                  "Location data updated for anonymous user in Firestore."
                );
              })
              .catch((error) => {
                console.error(
                  "Error updating location data for anonymous user:",
                  error
                );
              });

            // Remove location data from localStorage
            localStorage.removeItem(`anonymous_location_${anonymousUid}`);
          }
        }

        navigate("/"); // Redirect after sign-out
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const goToSearchBar = () => {
    if (pathname !== "/search") {
      localStorage.removeItem("recent_Search");
      navigate("/search");
    }
  };

  return (
    <div className="w-full  bg-slate-900 border-b-2 border-b-gray-800  fixed z-[200000]">
      <div className="mx-4 px-[120px]  h-20 flex items-center justify-between">
        <div className="flex items-center justify-between gap-12">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="w-12" />
          </Link>

          <Locationbar />
        </div>

        <div className="flex  items-center gap-16">
          <div
            className="flex justify-center items-center gap-2 cursor-pointer"
            onClick={goToSearchBar}
          >
            <HiOutlineSearch className="text-2xl" />
            <span className="text-[18px]">Search</span>
          </div>
          <div
            className=""
            onClick={() => setShowLoginPopup(true)}
            ref={logBtnRef}
          >
            <div
              ref={profileBtnRef}
              onMouseOver={() => setShowProfileCard(true)}
              className="flex items-center gap-2"
            >
              <HiOutlineUserCircle className="text-2xl" />{" "}
              {userData?.name && userData?.name !== null ? (
                <span>{userData?.name}</span>
              ) : (
                "Sign In"
              )}
              {/* <span>Sign In</span> */}
            </div>
          </div>
          {showLoginPopup && (
            <>
              <div className="overlay"></div>

              <Login
                setShowLoginPopup={setShowLoginPopup}
                logInRef={logInRef}
                onContinue={handleContinueClick}
                handleContineueafterSignIn={handleContineueafterSignIn}
              />
            </>
          )}

          {showProfileCard &&
            !showLoginPopup &&
            userData &&
            !userData?.isAnonymous && (
              <div
                className="w-32 h-10 bg-slate-800 fixed top-15 right-[250px] z-[23161365] text-center"
                onClick={handleUserSignOut}
                onMouseLeave={() => setShowProfileCard(false)}
                ref={profileRef}
              >
                SignOut
              </div>
            )}
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
