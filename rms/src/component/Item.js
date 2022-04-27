import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'

function printItem(data, setX) {

    setX(data.map((item, index) => {
        if(item.availabilty == null  ){
            item.availabilty = "Not Available";
        }
        if(item.rating == null ){
            item.rating = "0";
        }
    return ( 
        <tr>
        <td>{item.item_id}</td>
        <td><a style={{ textDecoration: "none" }} href={'/items/' + item.id}>{item.name}</a> </td>
        <td>{item.type}</td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td>{item.availabilty}</td>
        <td>{item.rating}</td>
       
      </tr> 
    )
}))
}
function Item(){
    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    
    useEffect(() => {
        fetch('http://localhost:3001/items')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            printItem(data, setX);
            setData(data);
            
        })
    }, []);
    
    return (
        <div>
        <tr>
          <th style={{textAlgin:"left"}}>Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>Category</th>
          <th>Price</th>
          <th>Availabilty</th>
          <th>Rating</th>
        </tr>
            {X}
        </div>
    )
}
export default Item;