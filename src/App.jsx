import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import TagsCollectionPage from "./pages/TagsCollectionPage";

import MenuItemSearchPage from "./pages/MenuItemSearchPage";

import AppLayout from "./components/AppLayout";

import { lazy, Suspense } from "react";

import FallbackSpinner from "./shared/FallbackSpinner";

const RestaurantDetailsPage = lazy(() =>
  import("./pages/RestaurantDetailsPage")
);
const SearchPage = lazy(() => import("./pages/SearchPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

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
          element: (
            <Suspense fallback={<FallbackSpinner />}>
              <RestaurantDetailsPage />
            </Suspense>
          ),
        },
        {
          path: "/city/:location/:restaurantName/:areaName/:restaurantId/menuSearch",
          element: <MenuItemSearchPage />,
        },

        {
          path: "/search",
          element: (
            <Suspense fallback={<FallbackSpinner />}>
              <SearchPage />
            </Suspense>
          ),
        },

        {
          path: "/checkout",
          element: (
            <Suspense fallback={<FallbackSpinner />}>
              <CheckoutPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
