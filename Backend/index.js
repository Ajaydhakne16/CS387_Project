const express = require('express');
const app = express();
const port = 3001;
const ptest = require('./item.js');
const o = require('./orders.js');
const m = require('./menu.js');
const i = require('./stock.js');
const u = require('./users.js');
const t = require('./table.js');
const e = require('./employee.js');

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});
app.get('/items',(req,res)=>{
    
    ptest.list_items()
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);
app.get('/items/:id',(req,res)=>{
    ptest.list_item_ingredients(parseInt(req.params.id))
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);

app.get('/orders/',(req,res)=>{
    o.display_all_orders()
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);

app.get('/orders/:id',(req,res)=>{
    o.display_orders(req.params.id)
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);

app.get('/menu',(req,res)=>{
    m.display_menu(req.params.id)
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);
app.get('/menu/:id',(req,res)=>{
    m.display_item_details(req.params.id)
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);
app.get('/stock',(req,res)=>{
    i.list_ingredients()
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/stock/:id',(req,res)=>{
    i.ingredient_details(req.params.id)
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/user',(req,res)=>{

    u.display_users()
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/user/:id',(req,res)=>{
    u.user_details(req.params.id)
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/table',(req,res)=>{
    t.show_tables()
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
