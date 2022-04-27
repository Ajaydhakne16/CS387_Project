import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function printCustomers(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
        <td><a style={{ textDecoration: "none" }} href={'/customers/' + item.email}>{item.name}</a> </td>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.premium}</td> 
        </tr>   
    )
}))
}
function Customer(){

    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    
    useEffect(() => {
        fetch('http://localhost:3001/customers')
        .then(res => res.json())
        .then(data => {
            
            printCustomers(data, setX);
            setData(data);
        })
    }, []);
    return (
        <div>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Premium</th>

        </tr>
            {X}
        </div>
    )
}
export default Customer;