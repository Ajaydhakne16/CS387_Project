import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = () => {
        const token = localStorage.getItem("token")
        console.log(token)
        axios({
                url: "http://localhost:3001/userInfo",
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then((res) => { 
                setUserInfo(res.data)
                console.log(userInfo)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

  return (
    <div className ="container">
        <div>
            <div className ="card">
                <div className ="card-header">
                    <div className ="card-photo">
                        <img src="https://demos.creative-tim.com/impact-design-system-pro/docs/assets/img/team/6.jpg" alt=""/>
                    </div>
                </div>
                <div className ="card-body mt-5" style={{color:"white"}} >
                    <h3 className ="card-name" style={{color:"white"}}>{userInfo.name}</h3>
                    <p className ="card-description" style={{color:"white"}}>{userInfo.email}</p>
                    <p className ="card-description" style={{color:"white"}}>CONTACT : {userInfo.contact}</p>
                    <p className ="card-description" style={{color:"white"}}>ADDRESS : {userInfo.address}</p>
                    <p className ="card-description" style={{color:"white"}}>PREMIUM : {userInfo.premium}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;