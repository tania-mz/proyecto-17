import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DetailsId from "./components/Details";
import Home from "./components/Home";

import Details from "./pages/Filter";
import { StateContext } from "./context/stateContext";

import "./App.css";

function App() {
  return (
    <StateContext>
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:type/:search" element={<Details />} />
        <Route path="/:search/:ID" element={<DetailsId />} />
      </Routes>
    </StateContext>
  );
}

export default App;
