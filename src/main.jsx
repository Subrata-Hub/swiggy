import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import appStore from "./utils/appStore.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
      <ToastContainer
        position="top-right"
        toastClassName="custom-toast-container"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999999999 }}
      />

      {/* <ToastContainer /> */}
    </Provider>
  </StrictMode>
);
