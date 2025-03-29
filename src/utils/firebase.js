// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXjKFUduwSvrg2zJfulcSzXajYQIpcHp0",
  authDomain: "foodify-bfb28.firebaseapp.com",
  projectId: "foodify-bfb28",
  storageBucket: "foodify-bfb28.firebasestorage.app",
  messagingSenderId: "767023352644",
  appId: "1:767023352644:web:9747400a42f3ae95186511",
  measurementId: "G-5JHD8Y4N86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
