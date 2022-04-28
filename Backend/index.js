const express = require('express');
const app = express();
const port = 3001;
const ptest = require('./db.js');
const create_model = require('./create.js');
const user_model = require('./users.js');
const jwt = require('jsonwebtoken');
app.use(express.json());

const cors = require('cors');
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.tokenData = decoded;
      return next();
    });
  }

app.get('/check', verifyJWT, (req,res)=>{
    res.send("Your token is verified");
    console.log(req.tokenData.email);
});

app.get('/userInfo', verifyJWT, (req,res)=>{

  user_model.getUserInfo(req.tokenData.email)
  .then(response => {
      res.status(200).send(response);
      console.log(response)
    })
  .catch(error => {
      res.status(500).send(error);
    })
});

app.get('/',(req,res)=>{

    ptest.handle_query()
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);

app.post('/create/', (req, res) => {
    const {type} = req.query
    console.log(type)
    if(type == "customer"){
        create_model.create_customer(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          console.log(error)
          res.status(500).send(error);
        })
    }
    if(type == "owner"){
        create_model.create_owner(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
    }
    if(type == "manager"){
        create_model.create_manager(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
    }
    if(type == "chef"){
        create_model.create_chef(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
    }
    if(type == "delivery_person"){
        create_model.create_delivery_person(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
    }
    if(type == "cashier"){
        create_model.create_cashier(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
    }
    if(type == "waiter"){
        create_model.create_waiter(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
    }
    if(type == "supplier"){
        create_model.create_supplier(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
    }
});

app.post('/login/', (req, res) => {

    create_model.login_user(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })

});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
);