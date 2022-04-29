import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'

var a="";
function printUser(data, setX) {
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
function PrintTables(data, setT) {
    setT(data.map((item, index) => {
        a=item.name;
    return ( 
        <tr>
           <td>{item.table_num}</td> 
           <td>{item.location}</td> 
           <td>{item.seating_capacity}</td> 
      </tr> 
    )
}))
}
function PrintOrders(data, setS,setx) {
  
    setS(data.map((item, index) => {
       
    return ( 
        <tr>
           <td>{item.order_id}</td> 
           <td>{item.price}</td> 
           <td>{item.type}</td> 
           <td>{item.waiter_id}</td> 
           <td>{item.tip}</td>
           <td>{item.discout_coupon}</td>
           <td>{item.timestamp}</td>
           <td>{item.cashier_id}</td> 
      </tr> 
    )
}))
    setx(data.map((item, index) => {
        
        return ( 
            <tr>
            <th>Order_id</th>
            <th>Price</th>
            <th>Type</th>
            <th>Waiter_id</th>
            <th>Tip</th>
            <th>Discount</th>
            <th>Timestamp</th>
            <th>Cashier_id</th>
            </tr>
        )
    }))
}
function User_id(){
    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    const [S, setS] = useState(<></>);
    const [x, setx] = useState(<></>);

    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:3001/user/'+id)
        .then(res => res.json())
        .then(data => {
            printUser(data, setX);
            setData(data);   
        })
    }, []);
    function ShowOrders() {
        fetch('http://localhost:3001/orders/'+id)
          .then(res => res.json())
          .then(data => {
            setData(data);
            if (data.length !== 0){
            PrintOrders(data,setS,setx);}
            if(data.length == 0){
                setx(
                        <div> 
                            <h4>No orders placed yet.</h4></div>
                )
            }
           
          })
      }
      function ShowTables() {
        fetch('http://localhost:3001/table')
          .then(res => res.json())
          .then(data => {
            setData(data);
            console.log(data);
            if (data.length !== 0){
            PrintTables(data,setS);}
            setx(
                <tr>
                <th>Table Number</th>
                <th>Location</th>
                <th>Seating Capacity</th>
                </tr>
        )
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
            <br></br>
            <button class="btn btn-secondary" type="button" onClick={ShowOrders}>View Orders</button>
            <button class="btn btn-secondary" type="button" onClick={ShowTables}>Show tables</button>
            <br></br> <br></br>
            {x}
            {S}
        </div>
    )
}
export default User_id;