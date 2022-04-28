import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


var a="";
function printItem(data, setX) {
    setX(data.map((item, index) => {
        a=item.name;
    return ( 
        <div className="row" style={{marginBottom:"-400pt", marginTop:"-200pt"}}>
          <div className="bootcards-list col-sm-6" style={{backgroundImage: "linear-gradient(to bottom right, #070707)"}}>
            <div className="panel panel-default">
              
              <div className="list-group"  style={{color:"white"}}>
                <a className="list-group-item" style={{backgroundImage: "linear-gradient(to bottom right, #6b6868, #202020)",color:"white"}}>
                  <div className="row">
                    <div className="col-sm-5">
                      <h4 className="list-group-item-heading"  style={{color:"white"}}>{item.name}</h4>
                      <p className="list-group-item-text"  style={{color:"white"}}>{item.description}</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="list-group-item-text"  style={{color:"white"}}>STOCK - {item.stock} killo-units</p>
                      <p className="list-group-item-text"  style={{color:"white"}}>REQUIREMENT - {item.quantity} units</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
     
    )
}))
}
function Item_id(){
    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);

    const { id } = useParams();
    
    useEffect(() => {
        fetch('http://localhost:3001/items/'+id)
        .then(res => res.json())
        .then(data => {
            printItem(data, setX);
            setData(data);     
        })
    }, []);
    return (
        <div>
            <div className="title" style={{fontSize:"35pt", textAlign:"center"}}>{a}</div>
            <div  style={{color:"white", fontSize:"25pt", textAlign:"center", marginBottom:"-50pt"}}>Ingredients</div>
            <div className="container">
                {X}
            </div>
        </div>

    )
}
export default Item_id;