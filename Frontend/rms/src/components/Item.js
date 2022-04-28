import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


function printItem(data, setX) {
    let veg = false;
    let av = true;
    let drink = false;
    setX(data.map((item, index) => {
        if(item.category == "VEG"){
            veg = true;
        }
        if(item.availabilty == null  || item.availabilty==0){
            item.availabilty = "Not Available";
            av = false;
        }
        if(item.rating == null ){
            item.rating = "0";
        }
        if(item.type == "BEVERAGE"){
            drink = true;
        }
    return ( 
        <div className="card-category-1" style={{display:"inline-block" , marginRight:"10pt", marginLeft:"100pt", marginTop:"10pt"}}> 
            <div className="basic-card basic-card-aqua">
                <div className="card-content">
                    <span ><a style={{color:"white", fontSize:"large"}} href={'/items/' + item.item_id}>{item.name}</a></span>
                    <p className="card-text" style={{color:"white", fontSize:"large"}}>
                        {veg && !drink && <td style={{color:"green"}}>{item.category}</td>}
                        {!veg && !drink && <td style={{color:"red"}}>{item.category}</td>}<br/>
                        {drink && <td style={{color:"yellow"}}>{item.category}</td>}<br/>
                        TYPE - {item.type}<br/>
                        PRICE - Rs {item.price}<br/>
                        RATING - {item.rating}
                    </p>
                </div>

                <div className="card-link">
                    {av && <button type="submit" className="submit">Order</button>}
                    {!av && <button type="submit" className="submit" disabled>Order</button>}
                </div>
            </div>
        </div>
    )
}))
}

function Item(){
    const [veg, setVeg] = useState(false)
    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    
    useEffect(() => {
        fetch('http://localhost:3001/items')
        .then(res => res.json())
        .then(data => {
            printItem(data, setX);
            setData(data);   
        })
    }, []);
    
    return (
        <div>
            {X}
        </div>
    )
}
export default Item;