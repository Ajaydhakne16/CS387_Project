import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'

var a="";
function printItem(data, setX) {
    setX(data.map((item, index) => {
        a=item.name;
    return ( 
        <tr>
        <td>{item.ingredient_id}</td>
        <td>{item.quantity}</td>
        <td>{item.name}</td>
        <td>{item.stock}</td>
        <td>{item.description}</td>
      </tr> 
    )
}))
}
function Item_id(){
    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);

    const { item_id } = useParams();
    
    useEffect(() => {
        fetch('http://localhost:3001/items/'+item_id)
        .then(res => res.json())
        .then(data => {
            printItem(data, setX);
            setData(data);     
        })
    }, []);
    return (
        <div>
            <h2>{a}</h2>
        <tr>
          <th>Ingredient_id</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Description</th>
          
        </tr>
            {X}
        </div>
    )
}
export default Item_id;