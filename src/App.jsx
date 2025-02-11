import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import TagsCollectionPage from "./pages/TagsCollectionPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";

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
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
