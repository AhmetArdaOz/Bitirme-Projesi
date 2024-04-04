import MainPage from "./pages/MainPage";

import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./styling/App.css";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import NewAndPopular from "./pages/NewAndPopular";
import RootLayout from "./layout/RootLayout";
import MyList from "./pages/MyList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<MainPage />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="new&popular" element={<NewAndPopular />} />
        <Route path="mylist" element={<MyList/>}/>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
