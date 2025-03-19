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
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>
);
