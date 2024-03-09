import MainPage from "./pages/MainPage";

import React from "react";
import {
  BrowserRouter,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./styling/App.css";
import Movies from "./pages/MOvies";
import Series from "./pages/Series";
import OldButGold from "./pages/OldButGold";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route path="/" element={<MainPage />} >
            <Route path="movies" element={<Movies />} />
            <Route path="series" element={<Series />} />
            <Route path="oldbutgold" element={<OldButGold />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
