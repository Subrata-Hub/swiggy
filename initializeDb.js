/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */

// /* eslint-disable no-undef */
import dotenv from "dotenv";
import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

// Load environment variables
dotenv.config();

// Retrieve the string from environment variable
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_STRING;
// const databaseURL = process.env.FIREBASE_DATABASE_URL; // Also get this if needed

if (!serviceAccountString) {
  console.error(
    "Error: FIREBASE_SERVICE_ACCOUNT_JSON_STRING not found in .env file."
  );
  process.exit(1);
}

let serviceAccount;
try {
  // Parse the string back into a JSON object
  serviceAccount = JSON.parse(serviceAccountString);
} catch (error) {
  console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_JSON_STRING:", error);
  process.exit(1);
}

// Initialize Firebase Admin SDK (Initialize only once at the top level)
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //  databaseURL: databaseURL // Use the variable here
  });
  console.log("Firebase Admin SDK initialized using credentials from .env");
} catch (error) {
  // Handle the case where the app might have already been initialized (e.g., during hot reloading)
  if (error.code !== "app/duplicate-app") {
    console.error("Error initializing Firebase Admin SDK:", error);
    process.exit(1);
  } else {
    console.log("Firebase Admin SDK already initialized.");
  }
}

// ---- IMPORTANT: Replace with the path to your downloaded service account key ----
// import serviceAccount from "./path/to/your-service-account-key.json";
// ---- IMPORTANT: Replace with your Firebase project's database URL ----
// const databaseURL = "https://your-project-id.firebaseio.com"; // Find in Project Settings -> General -> Project ID

const usersInitialState = {
  email: "",
  name: "",
  uid: uuidv4(),
  locations: [],
  carts: [],
  searchs: [],
};

const locationsInitialState = {
  locuid: "",
  placeId: uuidv4(),
  userId: null,
  address: [],
  place: {},
  address_components: {},
  latlng: {},
};

const searchInitialState = {
  searchId: uuidv4(),
  userId: null,
  searchQuery: "",
  searchResults: {},
  isSearchResults: false,
  searchResultsForTab: {},
  filterObj: {},
  isFillBtnSelected: false,
  options: {
    radioOptionValue: "NONE",
    radioOptionLabel: "Relevance",
  },
  isResetStore: true,
  resParams: {},
};

const cartInitialState = {
  cartId: uuidv4(),
  userId: null,
  cartItems: [],
  resInfo: {},
  totalCardItems: 0,
};

const configInitialState = {
  conFigId: uuidv4(),
  userId: null,
  setting: {
    searchResultType: "",
    suggestionText: "",
  },
};

async function initializeFirestore() {
  try {
    const db = admin.firestore();
    console.log("Firebase Firestore initialized.");

    // --- Check if initialization already happened (Optional but Recommended) ---
    const metaRef = db.collection("_metadata").doc("initialization");
    const metaDoc = await metaRef.get();
    if (metaDoc.exists && metaDoc.data().completed) {
      console.log("Firestore initialization already completed. Exiting.");
      return; // Stop if already done
    }

    // Get references to collections
    const usersCollectionRef = db.collection("users");
    const locationsCollectionRef = db.collection("locations");
    const searchCollectionRef = db.collection("search");
    const cartCollectionRef = db.collection("cart");
    const configCollectionRef = db.collection("config");

    console.log("Creating initial documents...");

    // Generate unique IDs for the documents
    const userDocId = uuidv4();
    const locationDocId = uuidv4();
    const searchDocId = uuidv4();
    const cartDocId = uuidv4();
    const configDocId = uuidv4();

    // Use Batch Write for atomicity (optional but good practice)
    const batch = db.batch();

    batch.set(usersCollectionRef.doc(userDocId), {
      ...usersInitialState,
      uid: userDocId,
    }); // Assign generated ID
    batch.set(locationsCollectionRef.doc(locationDocId), {
      ...locationsInitialState,
      placeId: locationDocId,
    });
    batch.set(searchCollectionRef.doc(searchDocId), {
      ...searchInitialState,
      searchId: searchDocId,
    });
    batch.set(cartCollectionRef.doc(cartDocId), {
      ...cartInitialState,
      cartId: cartDocId,
    });
    batch.set(configCollectionRef.doc(configDocId), {
      ...configInitialState,
      conFigId: configDocId,
    });

    // --- Set the flag indicating completion ---
    batch.set(metaRef, {
      completed: true,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    await batch.commit();

    console.log(
      "Firestore initialized successfully with initial data and completion flag set."
    );
  } catch (error) {
    console.error("Error initializing Firestore:", error);
    process.exit(1); // Exit with error code
  }
}

// Run the initialization function
initializeFirestore().then(() => {
  console.log("Script finished.");
  process.exit(0); // Exit successfully
});
