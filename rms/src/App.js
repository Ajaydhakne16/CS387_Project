
import MyRoute  from './component/MyRoute';
import React from 'react';
// import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route,Routes, Link, BrowserRouter} from 'react-router-dom';
import Home from './component/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {

return(
    <Router>
      <div className='App'>
        <MyRoute/>
        <Routes>
          <Route path="/" element={<Home/>} />
          </Routes>
       </div>
    </Router>
  )
}
export default App;
