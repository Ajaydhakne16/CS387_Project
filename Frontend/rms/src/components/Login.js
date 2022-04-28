import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState({
    email:"", 
    password:""
  });

  const [errory, setError] = useState(false);
  const [valid, setValid] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);

  const getStatus = async e => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        console.log(token)
        axios({
                url: "http://localhost:3001/check",
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then((res) => { 
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            });
  };
  const navigate = useNavigate();
  const onSubmitForm = async e => {
    e.preventDefault();
    const body = { ...user };
    axios({
        url: "http://localhost:3001/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(body)
        })
        .then((res) => { 
            setLoginStatus(true)
            console.log(res.data.token)
            localStorage.setItem("token",res.data.token)
            navigate("/");
        })
        .catch((err) => {
            console.log(err)
        });
  };


  const handleEmail = (event) => {
    event.persist();
    setUser((user) => ({
      ...user,
      email: event.target.value,
    }));
  };

  const handlePassword = (event) => {
    event.persist();
    setUser((user) => ({
        ...user,
        password: event.target.value,
    }));
  };


  return (
  <div className="body">  
    <form className="form " onSubmit={onSubmitForm}>
    {/* {!valid && (
      <div className="error">Something Went Wrong</div>
    )}
    {errory && (
      <div className="error">Capacity must be Integer</div>
    )} */}
      <div className="title">Login</div>

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
        <label htmlFor="email" className="placeholder">Email*</label>
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
        <label htmlFor="contact" className="placeholder">Password</label>     
      </div> 

      <button type="submit" className="submit">login</button>

      <button  className="submit" onClick={getStatus} >Check</button>
    </form>
  </div>
     
  );
};

export default Login;