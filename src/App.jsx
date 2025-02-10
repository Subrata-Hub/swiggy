import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import Body from "./components/Body";
// import Navbar from "./components/Navbar";
import HomePage from "./pages/home";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
