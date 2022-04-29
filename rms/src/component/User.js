import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function printUsers(data, setX,sety) {
    
    sety(
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Premium</th>
        </tr>
    )
    setX(data.map((item, index) => {
    return ( 
        <tr>
        <td><a style={{ textDecoration: "none" }} href={'/user/' + item.email}>{item.name}</a> </td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.premium}</td> 
        </tr>   
    )
}))
}
function printfreqUsers(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
        <td><a style={{ textDecoration: "none" }} href={'/user/' + item.email}>{item.name}</a> </td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.premium}</td>
           <td>{item.c}</td> 
        </tr>   
    )
}))
}
function User(){

    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    const [y, sety] = useState(<></>);

    
    useEffect(() => {
        fetch('http://localhost:3001/user')
        .then(res => res.json())
        .then(data => {
            
            printUsers(data, setX,sety);
            setData(data);
        })
    }, []);
    function ShowFreqUser() {
        fetch('http://localhost:3001/user/freq')
          .then(res => res.json())
          .then(data => {
            setData(data);
            setX(<></>);
            sety()
            printfreqUsers(data,setX);
            sety(
                <tr>
          <th >Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>Category</th>
          <th>Price</th>
          <th>Availabilty</th>
          <th>Rating</th>
          <th>Count(Orders)</th>
          <th></th>
        </tr>
        )
    })
}
    return (
        <div>
        <button class="btn btn-secondary" type="button" onClick={ShowFreqUser}>Most Frequent Users</button>  
        {y}{X}
        </div>
    )
}
export default User