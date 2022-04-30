import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
const Home = () => {

    const [userInfo, setUserInfo] = useState({});

    const [premium, setPremium] = useState({
        email : "",
        premium : ""
    });

    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(false);
    const {type} = useParams();
    
    const getUserInfo = () => {
        const token = localStorage.getItem("token")
        console.log(token)
        axios({
                url: `http://localhost:3001/userInfo?type=${type}`,
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then((res) => { 
                setUserInfo(res.data)
                console.log(res.data)
                if(res.data.length == 0) setShow(false)
                if(res.data.premium == 0) setShow1(true)
            })
            .catch((err) => {
                setShow(false)
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const handlePremium = (e) => {
        const obj = {
            email : userInfo.email,
            premium : e.target.value
        }
        setPremium(obj)
        console.log(obj)
    }

    const handleClick = (e) => {
        const token = localStorage.getItem("token")
        console.log(token)
        axios({
            url: "http://localhost:3001/add/premium",
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}` 
            },
            data: JSON.stringify(premium)
            })
            .then((res) => { 
              console.log(res)
              setUserInfo({
                  ...userInfo,
                  premium:premium.premium
              })
            })
            .catch((err) => {
                console.log(err)
            });       
    }

  return (
    <div className ="container">
        {show && (
        <div>
            <div className ="card">
                <div className ="card-header">
                    <div className ="card-photo">
                        <img src="https://demos.creative-tim.com/impact-design-system-pro/docs/assets/img/team/6.jpg" alt=""/>
                    </div>
                </div>
                <div className ="card-body mt-5" style={{color:"black"}} >
                    <h3 className ="card-name" style={{color:"black"}}>{userInfo.name}</h3>
                    <p className ="card-description" style={{color:"black"}}>{userInfo.email}</p>
                    <p className ="card-description" style={{color:"black"}}>CONTACT : {userInfo.contact}</p>
                    <p className ="card-description" style={{color:"black"}}>ADDRESS : {userInfo.address}</p>
                    <p className ="card-description" style={{color:"black"}}>PREMIUM : {userInfo.premium}</p>
                    {show1 && 

                    (<div style={{width:"20%"}} className ="card-description">
                        <input
                            id="email"
                            className="input"
                            type="text"
                            name="email"
                            value={premium.premium}
                            onChange={handlePremium}
                            
                        />
                        <button type="submit" className="submit" onClick={handleClick} style={{marginBottom:"10pt"}}>Update</button>
                    </div>)
                    }
                </div>
            </div>
        </div>
        )}
        {!show && (
            <h2>{type} profile does not exist for you</h2>
        )}
    </div>
  );
};

export default Home;