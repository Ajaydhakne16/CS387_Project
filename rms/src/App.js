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
import CreateCustomer from './components/CreateCustomer';
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
            <Route path="/signup" element={<CreateCustomer/>}/>
            <Route path="add/:type" element={<CreateUser/>} /> 
            <Route path="profile/:type" element={<Home/>} /> 
        </Routes>
        </BrowserRouter>
    );
}

export default App;
