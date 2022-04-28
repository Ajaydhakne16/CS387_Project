import React, { useEffect }  from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


import Home from "./Home";

export function MyRoute(){

    return (
         
        <div style={{margin:"0 auto",  width: "700px"}}>
           <div style={{margin:"0 auto",  width: "700px"}} class="btn-group" role="group" aria-label="Basic example">
         <button class="btn btn-secondary" type="button">
            <Link style={{color:"white",textDecoration:"none"}} to="/user" >Users</Link>
         </button>
         <button class="btn btn-secondary" type="button">
            <Link style={{color:"white",textDecoration:"none"}} to="/items" >Items</Link>
         </button>
         <button class="btn btn-secondary" type="button">
            <Link style={{color:"white",textDecoration:"none"}} to="/employees" >Employees</Link>
         </button>
         <button class="btn btn-secondary" type="button">
            <Link style={{color:"white",textDecoration:"none"}} to="/owner">Owner </Link>
         </button>
         <button class="btn btn-secondary" type="button">
            <Link style={{color:"white",textDecoration:"none"}} to="/">Home</Link>
         </button>
         </div>
        </div>

    );  
}
export default MyRoute; 

