const express = require('express');
const app = express();
const port = 3001;
const ptest = require('./db.js');
const o = require('./orders.js');
const m = require('./menu.js');
const i = require('./ingredient.js');
const u = require('./user.js');
const t = require('./table.js');

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

app.get('/orders',(req,res)=>{
    o.display_orders()
    .then(response => {
        res.status(200).send(response.rows);
      })
    .catch(error => {
        res.status(500).send(error);
      })
}
);

app.get('/orders/:id',(req,res)=>{
    o.display_order(req.params.id)
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
    u.list_users()
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
    t.list_tables()
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