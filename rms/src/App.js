
import MyRoute  from './component/MyRoute';
import React from 'react';
// import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route,Routes, Link, BrowserRouter} from 'react-router-dom';
import Home from './component/Home';
import Item from './component/Item'
import Item_id from './component/Item_id'
import User from './component/User.js'
import User_id from './component/User_id.js'
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {

return(
    <Router>
      <div className='App'>
     
        <br></br>
        <MyRoute/>
        <br></br>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/items" element={<Item/>}/>
          <Route path="/items/:id" element={<Item_id/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/user/:id" element={<User_id/>}/>
          </Routes>
       </div>
    </Router>
  );
}
export default App;
