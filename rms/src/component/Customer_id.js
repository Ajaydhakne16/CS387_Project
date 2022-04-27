import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'

var a="";
function printCustomer(data, setX) {
    setX(data.map((item, index) => {
        a=item.name;
    return ( 
        <tr>
           <td>{item.email}</td> 
           <td>{item.contact}</td> 
           <td>{item.address}</td> 
           <td>{item.premium}</td> 
      </tr> 
    )
}))
}

function Customer_id(){
    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);

    let { email_id } = useParams();
    
    
    useEffect(() => {
        fetch('http://localhost:3001/customers/'+email_id)
        .then(res => res.json())
        .then(data => {
            printCustomer(data, setX);
            setData(data);   
        })
    }, []);
    return (
        <div>
         <h2>{a}</h2>
        <tr>
        <th>Email</th>
        <th>Contact</th>
        <th>Address</th>
        <th>Premium</th>
        </tr>
            {X}
        </div>
    )
}
export default Customer_id;