import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import DetailsId from './components/details';
import Home from './components/Home';


import Details from './pages/Filter';
import { StateContext } from './context/stateContext';

//import {
//  createBrowserHistory,
//} from 'history';

import './App.css';

function App() {
  return (
    <StateContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/*" element={<Details />} />
          <Route path="/id/*" element={<DetailsId />} />
        </Routes>
    </StateContext>
  );
}

export default App
