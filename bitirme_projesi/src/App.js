import MainPage from "./pages/MainPage";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* Add more routes for additional pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
