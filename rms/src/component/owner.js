import React, { useEffect } from "react";
import { useState } from "react";

function PrintOwner(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
        <td>{item.name}</td>
        <td>{item.email}</td> 
        <td>{item.contact}</td> 
        <td>{item.address}</td> 
        <td>{item.share}</td> 
        <td>{item.salary}</td> 
     </tr>   
    )
}))
}
function Owner(){

    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    const [x, setx] = useState(<></>);
    const [S, setS] = useState(<></>);

    useEffect(() => {
        fetch('http://localhost:3001/owners')
        .then(res => res.json())
        .then(data => {
            setData(data);
            if (data.length !== 0){
                PrintOwner(data,setS);}
        })
    }, []);

return(
    <div>
        <tr>
            <tr>
        <th >Name</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Address</th>
        <th>Share</th>
        <th>Salary</th>
        </tr>
        </tr>
        {S}
    </div>
)
}
export default Owner;
