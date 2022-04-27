import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'

function printItem(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
        <td>{item.item_id}</td>
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
            console.log(data);
            printItem(data, setX);
            setData(data);
            
        })
    }, []);
    
    return (
        <div>
            <h2>hehe</h2>
            {X}
        </div>
    )
}
export default Item_id;