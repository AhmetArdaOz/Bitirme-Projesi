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
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SuggestionPage from "./pages/SuggestionPage";
import WelcomePage from "./pages/WelcomePage";
import MoviePage from "./pages/MoviePage";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<WelcomePage/>}/>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="suggestion" element={<SuggestionPage/>}/>
        <Route path="home" element={<MainPage />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="new&popular" element={<NewAndPopular />} />
        <Route path="mylist" element={<MyList/>}/>
        <Route path="/moviepage/:id" element={<MoviePage />} />
        <Route path="/admin" element={<AdminPage/>}/>
      </Route>

    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
