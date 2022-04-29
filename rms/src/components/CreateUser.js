import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const CreateUser = () => {
  const {type} = useParams();
  const [user, setUser] = useState({
    email:"", 
    name:"", 
    contact:"", 
    address:"", 
    password:"",
    salary:"",
    rating:"",
    description:"",
    speciality:"",
    primary_code:"",
    secondary_code:"",
    prefernce:""
  });

  const [errory, setError] = useState(false);
  const [valid, setValid] = useState(true);
  const [customer, setCustomer] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [waiter, setWaiter] = useState(false);
  const [chef, setChef] = useState(false);
  const [cashier, setCashier] = useState(false);
  const [owner, setOwner] = useState(false);
  const [manager, setManager] = useState(false);
  const [supplier, setSupplier] = useState(false);

  useEffect(() => {
    if(type == "delivery_person"){
      setDelivery(true)
    }
    if(type == "owner"){
      setOwner(true)
    }
    if(type == "waiter"){
      setWaiter(true)
    }
    if(type == "chef"){
      setChef(true)
    }
    if(type == "cashier"){
      setCashier(true)
    }
    if(type == "manager"){
      setManager(true)
    }
    if(type == "supplier"){
      setSupplier(true)
    }
  }, []);

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      if(!errory){
        const body = { ...user };
        const response = await fetch(`http://localhost:3001/create?type=${type}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        // window.location = "/users";
      }

    } catch (err) {
      setValid(false);
    }
  };

  const handleEmail = (event) => {
    event.persist();
    setUser((user) => ({
      ...user,
      email: event.target.value,
    }));
  };

  const handleName = (event) => {
    const g = event.target.value;
    console.log(g);
    event.persist();
    setUser((user) => ({
        ...user,
        name: event.target.value,
    }));
  };

  const handleContact = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        contact: event.target.value,
    }));
  };

  const handleAddress = (event) => {
    event.persist();

    setUser((user) => ({
        ...user,
        address: event.target.value,
    }));
  };

  const handlePassword = (event) => {
    event.persist();

    setUser((user) => ({
        ...user,
        password: event.target.value,
    }));
  };

  
  const handlePrimaryCode = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        primary_code: event.target.value,
    }));
  };

  const handleSecondaryCode = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        secondary_code: event.target.value,
    }));
  };
  const handleRating = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        rating: event.target.value,
    }));
  };

  const handleSpeciality = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        speciality: event.target.value,
    }));
  };
  const handlePreference = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        prefernce: event.target.value,
    }));
  };
  const handleSalary = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        salary: event.target.value,
    }));
  };
  const handleDescription = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        description: event.target.value,
    }));
  };
  const handleShare = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        share: event.target.value,
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
      <div className="title">Add new {type}</div>

      <div className="input-container ic1">
        <input
            id="email"
            className="input"
            type="text"
            name="email"
            value={user.email}
            onChange={handleEmail}
            
        />
        <div className="cut"></div>
        <label htmlFor="email" className="placeholder">Email</label>
        
      </div>
      <div className="input-container ic2">
        <input
              id="name"
              className="input"
              type="text"
              name="name"
              value={user.name}
              onChange={handleName}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="city_name" className="placeholder">Name</label>
      </div>
      <div className="input-container ic2">
        <input
              id="contact"
              className="input"
              type="text"
              name="contact"
              value={user.contact}
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
            value={user.address}
            onChange={handleAddress}
        />
        <div className="cut"></div>
        <label htmlFor="address" className="placeholder">Address</label>  
      </div>
      <div className="input-container ic2">
        <input
            id="password"
            className="input"
            type="text"
            name="password"
            value={user.password}
            onChange={handlePassword}
        />
        <div className="cut"></div>
        <label htmlFor="password" className="placeholder">Password</label>  
      </div>
      {delivery && (
      <div className="input-container ic2">
        <input
            id="primary_code"
            className="input"
            type="text"
            name="primary_code"
            value={user.primary_code}
            onChange={handlePrimaryCode}
        />
        <div className="cut"></div>
        <label htmlFor="primary_code" className="placeholder">Primary Code</label> 
      </div>
      )}
      {delivery &&(
      <div className="input-container ic2">
        <input
            id="secondary_code"
            className="input"
            type="text"
            name="secondary_code"
            value={user.secondary_code}
            onChange={handleSecondaryCode}
        />
        <div className="cut"></div>
        <label htmlFor="secondary_code" className="placeholder">Secondary Code</label> 
      </div>)}
      {(delivery || manager || owner || delivery || cashier || waiter) && (
      <div className="input-container ic2">
        <input
            id="salary"
            className="input"
            type="text"
            name="salary"
            value={user.salary}
            onChange={handleSalary}
        />
        <div className="cut"></div>
        <label htmlFor="salary" className="placeholder">Salary</label>
      </div>
      )}
      {chef && (
        <div className="input-container ic2">
          <input
              id="speciality"
              className="input"
              type="text"
              name="speciality"
              value={user.speciality}
              onChange={handleSpeciality}
          />
          <div className="cut"></div>
          <label htmlFor="speciality" className="placeholder">Speciality</label> 
        </div>
      )}
      {supplier && (
      <div className="input-container ic2">
        <input
            id="prefernce"
            className="input"
            type="text"
            name="prefernce"
            value={user.prefernce}
            onChange={handlePreference}
        />
        <div className="cut"></div>
        <label htmlFor="prefernce" className="placeholder">Prefernce</label>  
      </div>
      )}
      {(delivery || waiter) && (
      <div className="input-container ic2">
        <input
            id="rating"
            className="input"
            type="text"
            name="rating"
            value={user.rating}
            onChange={handleRating}
        />
        <div className="cut"></div>
        <label htmlFor="rating" className="placeholder">Rating</label>
      </div>
      )}
      {owner && (
      <div className="input-container ic2">
        <input
            id="share"
            className="input"
            type="text"
            name="share"
            value={user.share}
            onChange={handleShare}
        />
        <div className="cut"></div>
        <label htmlFor="share" className="placeholder">Share</label>
        
      </div>
      )}
      {manager && (
      <div className="input-container ic2">
        <input
            id="description"
            className="input"
            type="text"
            name="description"
            value={user.description}
            onChange={handleDescription}
        />
        <div className="cut"></div>
        <label htmlFor="description" className="placeholder">Description</label>
      </div>
      )}
      <button type="submit" className="submit">ADD</button>
    </form>
  </div>
     
  );
};

export default CreateUser;