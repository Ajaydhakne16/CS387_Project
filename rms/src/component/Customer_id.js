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
function PrintOrders(data, setS) {
    
    setS(data.map((item, index) => {
       
    return ( 
        <tr>
           <td>{item.order_id}</td> 
           <td>{item.price}</td> 
           <td>{item.type}</td> 
           <td>{item.waiter_id}</td> 
           <td>{item.tip}</td>
           <td>{item.cashier_id}</td> 
      </tr> 
    )
}))
}

function Customer_id(){
    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    const [S, setS] = useState(<></>);

    const { email } = useParams();
    
    useEffect(() => {
        fetch('http://localhost:3001/customers/'+email)
        .then(res => res.json())
        .then(data => {
            printCustomer(data, setX);
            setData(data);   
        })
    }, []);
    function ShowOrders() {
        fetch('http://localhost:3001/customers/orders/'+email)
          .then(res => res.json())
          .then(data => {
            setData(data);
            setS(PrintOrders(data));
            console.log(data);
          })
      }
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
            <button class="btn btn-secondary" type="button" onClick={ShowOrders}>View Orders</button>
            {S}
        </div>
    )
}
export default Customer_id;