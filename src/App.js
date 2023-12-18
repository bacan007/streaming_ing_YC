import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './App.css';

import Rent from "./components/Rent.jsx";
import Buy from "./components/Buy.jsx";
import Posts from "./components/Posts.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

function App() {
   return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Routes>
          
              <Route path="/" element={<Posts/>}/>
              <Route path="/rent/:id" element={<Rent/>}/>
              <Route path="/buy/:id" element={<Buy/>}/>
              <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
          </Router>
          </Provider>
        </div>);
}

export default App;
