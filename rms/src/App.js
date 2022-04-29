import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from "react";
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import Item from './components/Item';
import Item_id from './components/Item_id';
import CreateItem from './components/CreateItem';
import CreateIngredient from './components/CreateIngredient';
import IngredientList from './components/IngredientList';
import CreateOrder from './components/CreateOrder';
import User from './component/User.js'
import User_id from './component/User_id.js'
import Employee from './component/Employee.js'
import Owner from './component/owner';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    const [data, setData] = useState([]);
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} /> 
            <Route path="/create/order" element={<CreateOrder/>} /> 
            <Route path="/add/item" element={<CreateItem/>} /> 
            <Route path="/add/ingredient" element={<CreateIngredient/>} /> 
            <Route path="/items" element={<Item data={data} setData={setData}/>}/>
            <Route path="/items/:id" element={<Item_id/>}/>
            <Route path="signup/:type" element={<CreateUser/>} /> 
            <Route path="profile/:type" element={<Home/>} /> 
            <Route path="/user" element={<User/>}/>
            <Route path="/user/:id" element={<User_id/>}/>
            <Route path="/employees" element={<Employee/>}/>
            <Route path="/owners" element={<Owner/>}/>
        </Routes>
        </BrowserRouter>
    );
}
