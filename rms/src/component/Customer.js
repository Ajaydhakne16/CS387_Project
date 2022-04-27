import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function printCustomers(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
            {item.name} {item.id}
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
            console.log(data);
            printCustomers(data, setX);
            setData(data);
        })
    }, []);
    return (
        <div>
            {X}
        </div>
    )
}
export default Customer;