import React, { useState } from "react";

const CreateIngredient = () => {
  const [ingredient, setIngredient] = useState({
    name : "", 
    stock : "", 
    description : ""
  });

  const [errory, setError] = useState(false);
  const [valid, setValid] = useState(true);

  const onSubmitForm = async e => {
    e.preventDefault();
    console.log(ingredient)
    try {
      if(!errory){
        const body = { ...ingredient };
        const response = await fetch("http://localhost:3001/create/ingredient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
      }

    } catch (err) {
      setValid(false);
    }
  };

  const handleName = (event) => {
    event.persist();
    setIngredient((ingredient) => ({
      ...ingredient,
      name: event.target.value,
    }));
  };

  const handleStock = (event) => {
    event.persist();
    setIngredient((ingredient) => ({
        ...ingredient,
        stock: event.target.value,
    }));
  };

  const handleDescription = (event) => {
    event.persist();
    setIngredient((ingredient) => ({
        ...ingredient,
        description: event.target.value,
    }));
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
      <div className="title">Add New Ingredient</div>

      <div className="input-container ic1">
        <input
            id="name"
            className="input"
            type="text"
            name="name"
            value={ingredient.name}
            onChange={handleName}
        />
        <div className="cut"></div>
        <label htmlFor="name" className="placeholder">Name</label>
      </div>

      <div className="input-container ic2">
        <input
              id="stock"
              className="input"
              type="text"
              name="stock"
              value={ingredient.stock}
              onChange={handleStock}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="stock" className="placeholder">Stock</label>
      </div>

      <div className="input-container ic2">
        <input
              id="description"
              className="input"
              type="text"
              name="description"
              value={ingredient.description}
              onChange={handleDescription}
        />
        <div className="cut"></div>
        <label htmlFor="description" className="placeholder">Description</label>
      </div>

      <button type="submit" className="submit">ADD</button>
    </form>
  </div>
     
  );
};

export default CreateIngredient;