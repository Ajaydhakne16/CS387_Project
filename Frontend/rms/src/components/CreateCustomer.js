import React, { useState } from "react";

const CreateCustomer = () => {
  const [customer, setCustomer] = useState({
    email:"", 
    name:"", 
    contact:"", 
    address:"", 
    password:""
  });

  const [errory, setError] = useState(false);
  const [valid, setValid] = useState(true);

  const onSubmitForm = async e => {
    e.preventDefault();
    // if(isNaN(venue.capacity)){
    //   setError(true);
    // }
    // if(venue.venue_name && venue.city_name && venue.country_name && venue.capacity) {
    //   setValid(true);
    // }
    try {
      if(!errory){
        const body = { ...customer };
        const response = await fetch("http://localhost:3001/create?type=customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        // window.location = "/venues";
      }

    } catch (err) {
      setValid(false);
    }
  };

  const handleEmail = (event) => {
    event.persist();
    setCustomer((customer) => ({
      ...customer,
      email: event.target.value,
    }));
  };

  const handleName = (event) => {
    const g = event.target.value;
    console.log(g);
    event.persist();
    setCustomer((venue) => ({
        ...customer,
        name: event.target.value,
    }));
  };

  const handleContact = (event) => {
    event.persist();
    setCustomer((venue) => ({
        ...customer,
        contact: event.target.value,
    }));
  };

  const handleAddress = (event) => {
    event.persist();
    // if(isNaN(event.target.value)){
    //   setError(true);
    // }
    // else{
    //   setError(false);
    // }
    setCustomer((venue) => ({
        ...customer,
        address: event.target.value,
    }));
  };

  const handlePassword = (event) => {
    event.persist();
    // if(isNaN(event.target.value)){
    //   setError(true);
    // }
    // else{
    //   setError(false);
    // }
    setCustomer((venue) => ({
        ...customer,
        password: event.target.value,
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
      <div className="title">Add New Venue</div>

      <div className="input-container ic1">
        <input
            id="email"
            className="input"
            type="text"
            name="email"
            value={customer.email}
            onChange={handleEmail}
            
        />
        <div className="cut"></div>
        <label htmlFor="email" className="placeholder">Email*</label>
        
      </div>
      <div className="input-container ic2">
        <input
              id="name"
              className="input"
              type="text"
              name="name"
              value={customer.name}
              onChange={handleName}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="city_name" className="placeholder">Name*</label>
      </div>
      <div className="input-container ic2">
        <input
              id="contact"
              className="input"
              type="text"
              name="contact"
              value={customer.contact}
              onChange={handleContact}
        />
        <div className="cut"></div>
        <label htmlFor="contact" className="placeholder">contact</label>
        
      </div>
      <div className="input-container ic2">
        <input
            id="address"
            className="input"
            type="text"
            name="capacity"
            value={customer.address}
            onChange={handleAddress}
        />
        <div className="cut"></div>
        <label htmlFor="address" className="placeholder">Address*</label>
        
      </div>
      <div className="input-container ic2">
        <input
            id="password"
            className="input"
            type="text"
            name="password"
            value={customer.password}
            onChange={handlePassword}
        />
        <div className="cut"></div>
        <label htmlFor="password" className="placeholder">Password*</label>
        
      </div>
      <button type="submit" className="submit">ADD</button>
    </form>
  </div>
     
  );
};

export default CreateCustomer;