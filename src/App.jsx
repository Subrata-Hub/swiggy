import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import TagsCollectionPage from "./pages/TagsCollectionPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import MenuItemSearchPage from "./pages/MenuItemSearchPage";

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
      path: "/city/:location/:restaurantName/:areaName/:restaurantId/search",
      element: <MenuItemSearchPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
