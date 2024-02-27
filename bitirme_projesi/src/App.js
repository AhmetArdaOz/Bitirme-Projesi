import MainPage from "./pages/MainPage";

import React from "react";
import {
  BrowserRouter,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Movies from "./pages/MOvies";
import Series from "./pages/Series";
import OldButGold from "./pages/OldButGold";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="oldbutgold" element={<OldButGold />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
