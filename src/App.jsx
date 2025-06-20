import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import TagsCollectionPage from "./pages/TagsCollectionPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import MenuItemSearchPage from "./pages/MenuItemSearchPage";
import SearchPage from "./pages/SearchPage";
import AppLayout from "./components/AppLayout";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
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
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
      ],
    },
    // {
    //   path: "/",
    //   element: <HomePage />,
    // },
    // {
    //   path: "/collection/:collection_id/:tags/:search_context",
    //   element: <TagsCollectionPage />,
    // },

    // {
    //   path: "/city/:location/:restaurantName/:areaName/:restaurantId",
    //   element: <RestaurantDetailsPage />,
    // },
    // {
    //   path: "/city/:location/:restaurantName/:areaName/:restaurantId/menuSearch",
    //   element: <MenuItemSearchPage />,
    // },
    // {
    //   path: "/search",
    //   element: <SearchPage />,
    // },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
