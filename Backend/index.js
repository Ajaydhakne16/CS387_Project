const express = require('express');
const app = express();
const port = 3001;
const ptest = require('./db.js');

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});
app.get('/items',(req,res)=>{
    
    ptest.handle_query()
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);
app.get('/items/:item_id',(req,res)=>{
  
    ptest.handle_query1(parseInt(req.params.item_id))
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);
app.get('/customers',(req,res)=>{
  
    ptest.handle_query2()
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);

app.get('/customers/:email',(req,res)=>{
    
    ptest.handle_query3(req.params.email)
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);
app.get('/customers/orders/:email',(req,res)=>{
    ptest.handle_query4(req.params.email)
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
);
