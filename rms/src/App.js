
import MyRoute  from './component/MyRoute';
import React from 'react';
// import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route,Routes, Link, BrowserRouter} from 'react-router-dom';
import Home from './component/Home';
import Item from './component/Item'
import Item_id from './component/Item_id'
import Customer from './component/Customer.js'
import Customer_id from './component/Customer_id.js'
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
          <Route path="/items/:item_id" element={<Item_id/>}/>
          <Route path="/customers" element={<Customer/>}/>
          <Route path="/customers/:email" element={<Customer_id/>}/>
          <Route path="/employee/:employee_id" element={<Customer_id/>}/>
          <Route path="/employee" element={<Customer_id/>}/>
          </Routes>
       </div>
    </Router>
  );
}
export default App;
