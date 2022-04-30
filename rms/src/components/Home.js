import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
const Home = () => {

    const [userInfo, setUserInfo] = useState({});
    const [show, setShow] = useState(true);
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
                console.log(userInfo)
                if(res.data.length == 0) setShow(false)
            })
            .catch((err) => {
                setShow(false)
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

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
                <div className ="card-body mt-5" style={{color:"white"}} >
                    <h3 className ="card-name" style={{color:"white"}}>{userInfo.name}</h3>
                    <p className ="card-description" style={{color:"white"}}>{userInfo.email}</p>
                    <p className ="card-description" style={{color:"white"}}>CONTACT : {userInfo.contact}</p>
                    <p className ="card-description" style={{color:"white"}}>ADDRESS : {userInfo.address}</p>
                    <p className ="card-description" style={{color:"white"}}>PREMIUM : {userInfo.premium}</p>
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