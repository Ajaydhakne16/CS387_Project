import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function printIngredient(data, setX) {
    setX(data.map((ingredient, index) => {
    return ( <option value={ingredient.ingredient_id} style={{color:"black"}}>{ingredient.name}</option>)
}))
}
const IngredientList = (props) => {

    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [id, setId] = useState("");
    const [show, setShow] = useState(false);
    const [quant, setQuant] = useState("");
    const [X, setX] = useState(<></>);
    const {type} = useParams();
    const getUserInfo = () => {
        axios({
                url: `http://localhost:3001/stock`,
                method: "GET",
            })
            .then((res) => { 
                setIngredients(res.data)
                printIngredient(res.data, setX);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const chose = (value) => {
        setId(value);
        setShow(true);
    };

    const handleQuant = (event) => {
        event.persist();
        setQuant(event.target.value);
        console.log(event.target.value)
        const obj = {
            ingredient_id : id,
            quantity : event.target.value
        }
        const arr = [...props.ing]
        arr.push(obj)
        props.setIng(arr)
    };

  return (
   
        <div className="row">
            <div className="col-md-6">
                <form action="">
                    <select name="country" id="" className="form-control"  onChange={(e) => chose(e.target.value)} style={{color:"black"}}>
                        {X}
                    </select>

                    { show && (
                        <div className="input-container ic1">
                        <input
                            id="quant"
                            className="input"
                            type="text"
                            name="quant"
                            value={quant}
                            onChange={handleQuant}
                            
                        />
                        <div className="cut"></div>
                            <label htmlFor="quantity" >Quantity</label>
                        </div>  
                    )}  
                </form>
            </div>
        </div>
  );
};

export default IngredientList;