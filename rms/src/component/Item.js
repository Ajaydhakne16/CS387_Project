import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'

function printItem(data, setX,sety) {

    sety(<tr>
        <th >Id</th>
        <th>Name</th>
        <th>Type</th>
        <th>Category</th>
        <th>Price</th>
        <th>Availabilty</th>
        <th>Rating</th>
      </tr>)
      
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
        <td><a style={{ textDecoration: "none" }} href={'/items/' + item.item_id}>{item.name}</a> </td>
        <td>{item.type}</td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td>{item.availabilty}</td>
        <td>{item.rating}</td>
       
      </tr> 
    )
}))
}
function printbestItem(data, setX) {

   
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
        <td><a style={{ textDecoration: "none" }} href={'/items/' + item.item_id}>{item.name}</a> </td>
        <td>{item.type}</td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td>{item.availabilty}</td>
        <td>{item.rating}</td>
        <td>{item.c}</td>
      </tr> 
    )
}))
}

function Item(){

    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    const [x, setx] = useState(<></>);
    const [S, setS] = useState(<></>);
    const [y, sety] = useState(<></>);


    
    useEffect(() => {
        fetch('http://localhost:3001/items')
        .then(res => res.json())
        .then(data => {
            printItem(data, setX,sety);
            setData(data);    
        })
    }, []);
    function BestItems() {
        fetch('http://localhost:3001/items/best')
          .then(res => res.json())
          .then(data => {
            setData(data);
            setX(<></>);
            sety()
            printbestItem(data,setX);
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
        <button class="btn btn-secondary" type="button" onClick={BestItems}>BestItems</button>
        <br></br> <br></br>
        {y}
        {X}
        </div>
    )
}
export default Item;