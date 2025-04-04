import { Link } from "react-router-dom";
import Logo from "../assets/download.png";

import Locationbar from "./Locationbar";

import { HiOutlineSearch, HiOutlineUserCircle } from "react-icons/hi";
import Cart from "../shared/Cart";
import { useEffect, useRef, useState } from "react";
import Login from "./Login";
import useOutSideClick from "../hooks/useOutsideClick";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  // const [isSignIn, setIsSignIn] = useState(true);
  const [uid, setUid] = useState(null); // State to store the UID
  const [userData, setUserData] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [disableOutsideClick, setDisableOutsideClick] = useState(false);

  const logInRef = useRef(null);
  const logBtnRef = useRef(null);
  const profileRef = useState(null);
  const profileBtnRef = useRef(null);

  // console.log(userData);

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
  }, [uid]);

  const handleContineueafterSignIn = () => {
    setShowLoginPopup(false);
    setShowProfileCard(false);
  };

  const handleUserSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        console.log("User gone");
        // setShowProfileCard(false);
        // window.location.reload;
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className="bg-slate-950 h-20 flex items-center justify-between ">
      <img src={Logo} alt="logo" className="w-12" />
      <div className="flex justify-between items-center gap-32">
        <Locationbar />
        <div className="flex items-center gap-16">
          <Link to={`/search`}>
            <div className="flex justify-center items-center gap-2">
              <HiOutlineSearch className="text-2xl" />
              <span className="text-[18px]">Search</span>
            </div>
          </Link>
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

          {showProfileCard && !showLoginPopup && userData && (
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
