import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function PrintChefs(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
           <td>{item.name}</td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.speciality}</td> 
           <td>{item.salary}</td> 
        </tr>   
    )
}))
}
function PrintWaiters(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
           <td>{item.name}</td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.rating}</td> 
           <td>{item.salary}</td> 
        </tr>  
    )
}))
}
function PrintDeliveryPersons(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
           <td>{item.name}</td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.rating}</td> 
           <td>{item.salary}</td> 
        </tr>    
    )
}))
}
function PrintCashier(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
           <td>{item.name}</td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.no_of_bills}</td> 
           <td>{item.salary}</td> 
        </tr>    
    )
}))
}
function PrintManager(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
           <td>{item.name}</td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.description}</td> 
           <td>{item.salary}</td> 
        </tr>    
    )
}))
}

function Employee(){

    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    const [x, setx] = useState(<></>);
    const [S, setS] = useState(<></>);

    useEffect(() => {
        fetch('http://localhost:3001/employees')
        .then(res => res.json())
        .then(data => {
            setData(data);
        })
    }, []);
function ShowChefs() {
        fetch('http://localhost:3001/employees/chefs')
          .then(res => res.json())
          .then(data => {
            setData(data);
            if (data.length !== 0){
            PrintChefs(data,setS);}
            setx(
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Speciality</th>
                    <th>Salary</th>
                </tr>
        )
    })
}

function ShowWaiters() {
        fetch('http://localhost:3001/employees/waiters')
          .then(res => res.json())
          .then(data => {
            setData(data);
            if (data.length !== 0){
            PrintWaiters(data,setS);}
            setx(
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>rating</th>
                <th>Salary</th>
            </tr>
        )
    })
}
    function ShowDeliveryPersons() {
        fetch('http://localhost:3001/employees/dps')
          .then(res => res.json())
          .then(data => {
            setData(data);
            if (data.length !== 0){
            PrintDeliveryPersons(data,setS);}
            setx(
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>rating</th>
                <th>Salary</th>
            </tr>
        )
    })
}
function ShowCashiers() {
    fetch('http://localhost:3001/employees/cashiers')
      .then(res => res.json())
      .then(data => {
        setData(data);
        if (data.length !== 0){
        PrintCashier(data,setS);}
        setx(
            <tr>
                 <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>No. Of Bills</th>
            <th>Salary</th>
        </tr>
            </tr>
    )
})
}
    function ShowManager() {
        fetch('http://localhost:3001/employees/managers')
          .then(res => res.json())
          .then(data => {
            setData(data);
            if (data.length !== 0){
            PrintManager(data,setS);}
            setx(
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Description</th>
                <th>Salary</th>
            </tr>
        )
    })
}
    return (
        <div>
         <button class="btn btn-secondary" type="button" onClick={ShowChefs}>Chefs</button>
        <button class="btn btn-secondary" type="button" onClick={ShowWaiters}>Waiters</button>
        <button class="btn btn-secondary" type="button" onClick={ShowCashiers}>Cashiers</button>  
        <button class="btn btn-secondary" type="button" onClick={ShowDeliveryPersons}>Delivery Persons</button>  
        <button class="btn btn-secondary" type="button" onClick={ShowManager}>Manager</button>  
        <br></br> <br></br>
        {x}
        {S}
        </div>
    )
}
export default Employee;