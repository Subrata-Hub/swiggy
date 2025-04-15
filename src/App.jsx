import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import TagsCollectionPage from "./pages/TagsCollectionPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import MenuItemSearchPage from "./pages/MenuItemSearchPage";
import SearchPage from "./pages/SearchPage";
// import { useEffect } from "react";
// import { db } from "../src/utils/firebase";
// import { collection, doc, setDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/collection/:collection_id/:tags/:search_context",
      element: <TagsCollectionPage />,
    },

    {
      path: "/city/:location/:restaurantName/:areaName/:restaurantId",
      element: <RestaurantDetailsPage />,
    },
    {
      path: "/city/:location/:restaurantName/:areaName/:restaurantId/menuSearch",
      element: <MenuItemSearchPage />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
  ]);

  // const currentLocation = JSON.parse(localStorage.getItem("current_location"));

  // const usersInitialState = {
  //   email: "",
  //   name: "",
  //   uid: uuidv4(),

  //   locations: [],
  //   carts: [],
  //   searchs: [],
  // };

  // const locationsInitialState = {
  //   locuid: "",
  //   placeId: uuidv4(),
  //   userId: null,
  //   address: [],
  //   place: {},
  //   address_components: {},
  //   latlng: {},
  // };

  // const searchInitialState = {
  //   searchId: uuidv4(),
  //   userId: null,
  //   searchQuery: "",
  //   searchResults: {},
  //   isSearchResults: false,
  //   searchResultsForTab: {},
  //   filterObj: {},
  //   isFillBtnSelected: false,
  //   options: {
  //     radioOptionValue: "NONE",
  //     radioOptionLabel: "Relevance",
  //   },
  //   isResetStore: true,
  //   resParams: {},
  // };

  // const cartInitialState = {
  //   cartId: uuidv4(),
  //   userId: null,
  //   cartItems: [],
  //   resInfo: {},
  //   totalCardItems: 0,
  // };

  // const configInitialState = {
  //   conFigId: uuidv4(),
  //   userId: null,
  //   setting: {
  //     searchResultType: "",
  //     suggestionText: "",
  //   },
  // };

  // useEffect(() => {
  //   const initializeFirestore = async () => {
  //     if (currentLocation === undefined) {
  //       try {
  //         // Get references to the collections
  //         const usersCollectionRef = collection(db, "users");
  //         const locationsCollectionRef = collection(db, "locations");
  //         const searchCollectionRef = collection(db, "search");
  //         const cartCollectionRef = collection(db, "cart");
  //         const configCollectionRef = collection(db, "config");

  //         const userDocId = uuidv4();
  //         const locationDocId = uuidv4();
  //         const searchDocId = uuidv4();
  //         const cartDocId = uuidv4();
  //         const configDocId = uuidv4();

  //         // Add the initial state objects as documents
  //         // You might want to use a specific document ID instead of letting Firestore auto-generate one
  //         await setDoc(doc(usersCollectionRef, userDocId), usersInitialState);
  //         await setDoc(
  //           doc(locationsCollectionRef, locationDocId),
  //           locationsInitialState
  //         );
  //         await setDoc(
  //           doc(searchCollectionRef, searchDocId),
  //           searchInitialState
  //         );
  //         await setDoc(doc(cartCollectionRef, cartDocId), cartInitialState);
  //         await setDoc(
  //           doc(configCollectionRef, configDocId),
  //           configInitialState
  //         );

  //         console.log("Firestore initialized with initial data.");
  //       } catch (error) {
  //         console.error("Error initializing Firestore:", error);
  //       }
  //     }
  //   };

  //   initializeFirestore();
  // }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
