
import MyRoute  from './component/MyRoute';
import React from 'react';
// import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route,Routes, Link, BrowserRouter} from 'react-router-dom';
import Home from './component/Home';
import Customer from './component/Customer'
import Item from './component/Item'
import Item_id from './component/item_id'
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {

return(
    <Router>
      <div className='App'>
     
        <br></br>
        <MyRoute/>
        <br></br>
        <h3 style={{textAlign:"center"}}>Welcome to the RMS! </h3> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/items" element={<Item/>}/>
          <Route path="/items:item_id" element={<Item_id/>}/>
          </Routes>
       </div>
    </Router>
  );
}
export default App;
