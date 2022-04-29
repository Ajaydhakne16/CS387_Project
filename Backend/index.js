const express = require('express');
const app = express();
const port = 3001;
const ptest = require('./item.js');
const create_model = require('./create.js');
const user_model = require('./users.js');
const i = require('./ingredient.js');
const e = require('./employee.js');
const d = require('./discount.js');
const o = require('./orders.js');
const m = require('./menu.js');
const u = require('./users.js');
const t = require('./table.js');

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
app.get('/items/best',(req,res)=>{
    
    ptest.list_best_items()
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

app.get('/check', verifyJWT, (req,res)=>{
    res.send("Your token is verified");
    console.log(req.tokenData.email);
});

app.get('/userInfo', verifyJWT, (req,res)=>{
  const {type} = req.query
  user_model.getUserInfo(req.tokenData.email,type)
  .then(response => {
      res.status(200).send(response);
      console.log(response)
    })
  .catch(error => {
      res.status(500).send(error);
    })
});

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

app.post('/create/item', (req, res) => {

  create_model.create_item(req.body)
  .then(response => {
      res.status(200).send(response);
  })
  .catch(error => {
      res.status(500).send(error);
  })

});

app.post('/create/ingredient', (req, res) => {

  create_model.create_ingredient(req.body)
  .then(response => {
      res.status(200).send(response);
  })
  .catch(error => {
      console.log(error)
      res.status(500).send(error);
  })

});

app.post('/create/madeof', (req, res) => {

  create_model.create_madeof(req.body)
  .then(response => {
      res.status(200).send(response);
  })
  .catch(error => {
      console.log(error)
      res.status(500).send(error);
  })

});

app.post('/create/order', (req, res) => {

  create_model.create_order(req.body)
  .then(response => {
      res.status(200).send(response);
  })
  .catch(error => {
      console.log(error)
      res.status(500).send(error);
  })

});

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


app.get('/this_item',(req,res)=>{
  ptest.get_max_id()
  .then(response => {
      res.status(200).send(response);
      })
  .catch(error => {
      res.status(500).send(error);
      })
}
);

app.get('/coupons',(req,res)=>{
  d.all_coupons()
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
app.get('/user/freq',(req,res)=>{
    
    u.display_freq_users()
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
app.get('/employees/chefs',(req,res)=>{
    e.chef_details()
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/employees/waiters',(req,res)=>{
    e.waiter_details()
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/employees/dps',(req,res)=>{
    e.deliver_person_details()
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/employees/cashiers',(req,res)=>{
    e.cashier_details()
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/employees/managers',(req,res)=>{
    e.manager_details()
    .then(response => {
        res.status(200).send(response.rows);
        })
    .catch(error => {
        res.status(500).send(error);
        })
}
);
app.get('/owners',(req,res)=>{
    e.owner_details()
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
