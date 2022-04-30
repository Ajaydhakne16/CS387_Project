import React, { useState, useEffect } from "react";
import IngredientList from "./IngredientList";
import axios from "axios";
const CreateItem = () => {
  const [item, setItem] = useState({
    name : "", 
    price : "", 
    type : "", 
    category : "", 
    availability : "", 
    rating : ""
  });

  const [ing, setIng] = useState([]);
  const [ingredients, setIngredient] = useState([<IngredientList ing={ing} setIng={setIng}/>]);
  const [errory, setError] = useState(false);
  const [valid, setValid] = useState(true);

  const onSubmitForm = async e => {
    e.preventDefault();
    console.log(item)
    try {
      if(!errory){
        const body = { ...item };
        const response = await fetch("http://localhost:3001/create/item", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        axios({
          url: "http://localhost:3001/this_item",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          })
          .then((res) => { 
            console.log("hererrererer",res.data.item_id)
            ing.map(madeof => {
              const result = {
                ...madeof,
                item_id : res.data.item_id
              }
              console.log(result)
              axios({
                url: "http://localhost:3001/create/madeof",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(result)
                })
                .then((res) => { 
                  console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                });
            })
          })
          .catch((err) => {
              console.log(err)
          });
      }

    } catch (err) {
      setValid(false);
    }
  };

  const handleName = (event) => {
    event.persist();
    setItem((item) => ({
      ...item,
      name: event.target.value,
    }));
  };

  const handlePrice = (event) => {
    event.persist();
    setItem((item) => ({
        ...item,
        price: event.target.value,
    }));
  };

  const handleType = (event) => {
    event.persist();
    setItem((item) => ({
        ...item,
        type: event.target.value,
    }));
  };

  const handleCategory = (event) => {
    event.persist();
    setItem((item) => ({
        ...item,
        category: event.target.value,
    }));
  };

  const handleAvailability = (event) => {
    event.persist();
    setItem((item) => ({
        ...item,
        availability: event.target.value,
    }));
  };

  const handleRating = (event) => {
    event.persist();
    setItem((item) => ({
        ...item,
        rating: event.target.value,
    }));
  };

  const renderAnother = (e) => {
    e.preventDefault();
    let array = [];
    array = [...ingredients]
    array.push(<IngredientList ing={ing} setIng={setIng} />)
    console.log(ing)
    setIngredient(array)
  };

  return (
  <div className="body">  
    <form className="form " onSubmit={onSubmitForm}>
    {!valid && (
      <div className="error">Something Went Wrong</div>
    )}
    {errory && (
      <div className="error">Capacity must be Integer</div>
    )}
      <div className="title">Add New Item</div>

      <div className="input-container ic1">
        <input
            id="name"
            className="input"
            type="text"
            name="name"
            value={item.name}
            onChange={handleName}
            
        />
        <div className="cut"></div>
        <label htmlFor="name" >Name</label>
        
      </div>
      <div className="input-container ic2">
        <input
              id="price"
              className="input"
              type="text"
              name="price"
              value={item.price}
              onChange={handlePrice}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="price" >Price</label>
      </div>
      <div className="input-container ic2">
        <input
              id="type"
              className="input"
              type="text"
              name="type"
              value={item.type}
              onChange={handleType}
        />
        <div className="cut"></div>
        <label htmlFor="type" >Type</label>
        
      </div>
      <div className="input-container ic2">
        <input
            id="category"
            className="input"
            type="text"
            name="category"
            value={item.category}
            onChange={handleCategory}
        />
        <div className="cut"></div>
        <label htmlFor="category" >Category</label>
        
      </div>
      <div className="input-container ic2">
        <input
            id="availability"
            className="input"
            type="text"
            name="availability"
            value={item.availability}
            onChange={handleAvailability}
        />
        <div className="cut"></div>
        <label htmlFor="availability" >Availability</label>
        
      </div>
      <div className="input-container ic2">
        <input
            id="rating"
            className="input"
            type="text"
            name="rating"
            value={item.rating}
            onChange={handleRating}
        />
        <div className="cut"></div>
        <label htmlFor="rating" >Rating</label>
        
      </div>
      <div >
       
          {ingredients.map(ingredient => (  
            ingredient
          ))}      
        <div className="cut"></div>
        <button onClick={renderAnother} className="submit" style={{width:"20%",display:"block"}}>+</button>
      </div>
      <button type="submit" className="submit">ADD</button>
    </form>
  </div>
     
  );
};

export default CreateItem;