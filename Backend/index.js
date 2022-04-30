const express = require('express');
const app = express();
const port = 3001;
const ptest = require('./item.js');
const create_model = require('./create.js');
const user_model = require('./users.js');
const i = require('./ingredient.js');
const e = require('./employee.js');
const d = require('./discount.js');
const jwt = require('jsonwebtoken');

const obj = {
  isManager : false,
  isOwner : false,
  isCustomer : false,
  isCashier : false,
  isWaiter: false,
  isDelivery: false,
  isSupplier: false
};

app.use(express.json());

const cors = require('cors');
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

const checkManager = (email) => {
  e.get_manager(email)
  .then(response => {
      console.log(response.rows)
      if(response.rows.length>0){
        obj.isCashier = true;
      }
    })
  .catch(error => {
    })
}

const checkOwner = (email) => {
  e.get_owner(email)
  .then(response => {
      console.log(response.rows)
      if(response.rows.length>0)
      {
        obj.isOwner = true;
      }
    })
  .catch(error => {
    })
}

const checkCashier = (email) => {
  e.get_cashier(email)
  .then(response => {
      console.log(response.rows)
      if(response.rows.length>0)
      {
        obj.isCashier = true;
      }
    })
  .catch(error => {
    })
}

const checkWaiter = (email) => {
  let wai = false
  e.get_waiter(email)
  .then(response => {
      console.log(response.rows)
      if(response.rows.length>0)
      {
        obj.isWaiter = true;
      }
    })
  .catch(error => {
    })
}

const checkCustomer = (email) => {

  e.get_customer(email)
  .then(response => {
      console.log(response.rows)
      if(response.rows.length>0){
        obj.isCustomer=true
      }
    })
  .catch(error => {
    })
    
}

const checkSupplier = (email) => {
  e.get_supplier(email)
  .then(response => {
      console.log(response.rows)
      if(response.rows.length>0){
        obj.isSupplier = true
      }
    })
  .catch(error => {
    })
}

const checkDelivery = (email) => {
  e.get_delivery(email)
  .then(response => {
      console.log(response.rows)
      if(response.rows.length>0){
        obj.isDelivery = true
      }
    })
  .catch(error => {
    })
}

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }
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

app.post('/signup', (req, res) => {
  create_model.create_customer(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
});

app.post('/add', verifyJWT, (req, res) => {
    console.log(req.body)
    const {type} = req.query
    console.log(type)
    const email = req.tokenData.email;
    if(req.body.isManager || req.body.isOwner || req.body.isCashier)
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

    else if(req.body.isOwner){
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
    }

    else if(req.body.isOwner || req.body.isManager){
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
    }
    else{
      res.status(403).send("NOT PERMITTED");
    }
});

app.post('/login/', (req, res) => {
    const email = req.body.email;
    console.log("1",email)
    checkManager(email);
    checkOwner(email);
    checkSupplier(email);
    checkDelivery(email);
    checkWaiter(email);
    checkCashier(email);
    checkCustomer(email);
  

    create_model.login_user(req.body)
    .then(response => {
        res.status(200).send([response,obj]);
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

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
);