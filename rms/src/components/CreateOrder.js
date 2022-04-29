import React, { useState, useEffect } from "react";
import IngredientList from "./IngredientList";
import axios from "axios";


function printItem(data, setX, props) {
    let i = 0;
    setX(data.map((item, index) => {
    i = i+1;
    return ( 
        <tr className="table-rows" >
            <td className="items">{i}</td>
            <td className="items">{item.name}</td>
            <td className="items">{item.type}</td>
            <td className="items">{item.category}</td>
            <td className="items">Rs {item.price}</td>
        </tr>
    )
}))
}

const CreateOrder = () => {
    let arr = []
    const [order, setOrder] = useState({
        price:"", 
        type:"ONLINE",
        waiter_id:"",
        tip:"",
        customer_id:"",
        discount_coupon:"",
        timestamp:"",
        cashier_id:""
    });

    const [items, setItems] = useState([])
    const [discounts, setDiscounts] = useState([])
    const [waiters, setWaiters] = useState([])
    const [wshow, setWshow] = useState(false)
    const [tshow, setTshow] = useState(false)
    const [cshow, setCshow] = useState(false)
    const [dshow, setDshow] = useState(true)
    const [cashiers, setCashiers] = useState([])

    const [total, setTotal] = useState(0)
    const [X, setX] = useState(<></>);

    const confirm_order = () => {

        const body = { ...order };
        
        axios({
            url: "http://localhost:3001/create/order",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(body)
            })
              .then((res) => { 
                    console.log(res)
              })
              .catch((err) => {
                  console.log(err)
              });      
    }
    const getCashiers = () => {
        axios({
                url: `http://localhost:3001/employees/cashiers`,
                method: "GET",
            })
            .then((res) => { 
                setCashiers(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const getWaiters = () => {
        axios({
                url: `http://localhost:3001/employees/waiters`,
                method: "GET",
            })
            .then((res) => { 
                setWaiters(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const getDiscounts = () => {
        axios({
                url: `http://localhost:3001/coupons`,
                method: "GET",
            })
            .then((res) => { 
                setDiscounts(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        try {
            arr = JSON.parse(localStorage.getItem("order_items"))
            setItems(arr)
        } catch (error) {
            arr = []
        } 
        let tot = 0
        arr.map(item => {
            tot = tot + item.price
            
        })
        setOrder((order) => ({
            ...order,
            price: tot,
        }));

        setTotal(tot)
        printItem(arr, setX);

        getWaiters();
        getCashiers();
        getDiscounts();
        setOrder((order) => ({
            ...order,
            timestamp: "2022-03-29 22:00:00",
        }));  
    }, []); 

    const choseType = (value) => {
        const type = value;
        console.log(type)
        setOrder((order) => ({
          ...order,
          type: value,
        }));

        if(type=="OFFLINE"){
            setCshow(true)
            setWshow(true)
            setTshow(true)
            setDshow(false)
        }

        if(type=="TELEPHONE"){
            setCshow(true)
            setWshow(false)
            setTshow(false)
            setDshow(false)
        }
        if(type=="ONLINE"){
            setCshow(false)
            setWshow(false)
            setTshow(false)
            setDshow(true)
        }
    }

    const choseWaiter = (value) => {
       
        setOrder((order) => ({
          ...order,
          waiter_id: value,
        }));
    }

    const choseCashier = (value) => {
        setOrder((order) => ({
          ...order,
          cashier_id: value,
        }));
        
    }

    const handleTip = (e) => {
        e.persist();
        setOrder((order) => ({
          ...order,
          tip: e.target.value,
        }));        
    }

    const handleCustomer = (e) => {
        e.persist();
        setOrder((order) => ({
          ...order,
          customer_id: e.target.value,
        }));        
    }

    const choseDiscount = (value) => {
        const v = JSON.parse(value)
        setOrder((order) => ({
            ...order,
            discount_coupon: v.coupon_id,
        }));
        setTotal(total-v.discount*total/100)
        

    }

  return (
    <div style={{marginTop:"150pt", marginBottom:"50pt"}}>
    <div className="table-section">
        <table id="table">
            <thead>
            <tr className="header-row">
                <th className="header-item items">SNo</th>
                <th className="header-item items">ITEM NAME</th>
                <th className="header-item items">ITEM TYPE</th>
                <th className="header-item items">CATEGORY</th>
                <th className="header-item items">PRICE</th>
            </tr>
            </thead>

            <tbody>
                {X}  
            </tbody>          
        </table>
    </div> 
    <tr className="header-row" style={{backgroundColor:"black", opacity:"0.8"}}>
        <th className="header-item items" >Total amount to be paid</th>
        <th className="header-item items">Rs {total}</th>
    </tr>
        <div className="row">
            <div className="col-md-6">
                <form action="">
                    CHOSE THE TYPE OF ORDER :
                    <select name="country" id="1" className="form-control" onChange={(e) => choseType(e.target.value)}>
                        <option value="ONLINE" style={{color:"black"}}>ONLINE</option>
                        <option value="OFFLINE" style={{color:"black"}}>OFFLINE</option>
                        <option value="TELEPHONE" style={{color:"black"}}>TELEPHONE</option>
                    </select>
                </form>
            </div>
        </div>

        {wshow && (
        <div className="row">
            <div className="col-md-6">
                <form action="">
                    CHOSE THE WAITER :
                    <select name="country" id="2" className="form-control" onChange={(e) => choseWaiter(e.target.value)}>
                        {waiters.map(waiter => <option value={waiter.email} style={{color:"black"}}>{waiter.email}</option>)}
                    </select>
                </form>
            </div>
        </div>
        )}

        {tshow && (
        <div className="row">
        <div className="col-md-6">
            <input
                style={{backgroundColor:"white", marginTop:"10pt", color:"black"}}
                id="tip"
                className="input form-control"
                type="text"
                name="tip"
                value={order.tip}
                onChange={handleTip}
                placeholder="TIP"
            />
        </div>
        </div>
        )}

        {cshow && (
        <div className="row">
            <div className="col-md-6">
                <form action="">
                    CHOSE THE CASHIER :
                    <select name="country" id="3" className="form-control" onChange={(e) => choseCashier(e.target.value)}>
                        {cashiers.map(cashier => <option value={cashier.email} style={{color:"black"}}>{cashier.email}</option>)}
                    </select>
                </form>
            </div>
        </div>
        )}

        {(cshow || wshow) && (
        <div className="row">
            <div className="col-md-6">
                <input
                    style={{backgroundColor:"white", marginTop:"10pt", color:"black"}}
                    id="customer"
                    className="input form-control"
                    type="text"
                    name="customer"
                    value={order.customer}
                    onChange={handleCustomer}
                    placeholder="CUSTOMER"
                />
            </div>
        </div>
        )}
        {dshow && (
        <div className="row">
            <div className="col-md-6">
                <form action="">
                    CHOSE DISCOUNT COUPON :
                    <select name="country" id="4" className="form-control" onChange={(e) => choseDiscount(e.target.value)}>
                        {discounts.map(discount => <option value={JSON.stringify(discount)} style={{color:"black"}} >{discount.coupon_id} : {discount.discount}%</option>)}
                    </select>
                </form>
            </div>
        </div>
        )}
        <button type="submit" className="submit" onClick={confirm_order} >confirm order</button>
    </div>
    
  );
};

export default CreateOrder;