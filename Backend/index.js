const express = require('express');
const app = express();
const port = 3001;
const ptest = require('./db.js');
const create_model = require('./create.js');
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
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
    if(type == "customer"){
        create_model.create_customer(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
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

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
);