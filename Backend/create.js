const Pool =require('pg').Pool;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const create_customer = (params) => {
    return new Promise(function(resolve, reject) {
      pool.query('INSERT INTO customer (email, name, contact, address, password, premium) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [params.email, params.name, params.contact, params.address, params.password,0], (error, results) => {
        if (error) {
          reject(error)
        }
        else {
            console.log(results.rows[0]['name'])
            resolve(`A new customer has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_owner = (params) => {
    return new Promise(function(resolve, reject) {
      const { email, name, contact, address, password, share, salary } = params
      console.log(params)
      pool.query('INSERT INTO owner (email, name, contact, address, password, share, salary) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [email, name, contact, address, password, share, salary], (error, results) => {
        if (error) {
          reject(error)
        }
        else{
            console.log(results.rows[0]['name'])
            resolve(`A new customer has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_manager = (params) => {
    return new Promise(function(resolve, reject) {
      const { email, name, contact, address, password, description, salary } = params
      console.log(params)
      pool.query('INSERT INTO manager (email, name, contact, address, password, description, salary) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [email, name, contact, address, password, description, salary], (error, results) => {
        if (error) {
          reject(error)
        }
        else{
        console.log(results.rows[0]['name'])
        resolve(`A new manager has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_chef = (params) => {
    return new Promise(function(resolve, reject) {
      const { email, name, contact, address, password, speciality, salary } = params
      pool.query('INSERT INTO chef (email, name, contact, address, password, speciality, salary) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [email, name, contact, address, password, speciality, salary], (error, results) => {
        if (error) {
          reject(error)
        }
        else{
        console.log(results.rows[0]['name'])
        resolve(`A new chef has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_delivery_person = (params) => {
    return new Promise(function(resolve, reject) {
      const { email, name, contact, address, password, salary, primary_code, secondary_code, rating } = params
      pool.query('INSERT INTO delivery_person (email, name, contact, address, password, salary, primary_code, secondary_code, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [email, name, contact, address, password, salary, primary_code, secondary_code, rating], (error, results) => {
        if (error) {
          reject(error)
        }
        else{
            console.log(results.rows[0]['name'])
            resolve(`A new delivery_person has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_cashier = (params) => {
    return new Promise(function(resolve, reject) {
      const { email, name, contact, address, password, salary, no_of_bills } = params
      pool.query('INSERT INTO cashier (email, name, contact, address, password, salary, no_of_bills) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [email, name, contact, address, password, salary, primary_code, secondary_code, no_of_bills], (error, results) => {
        if (error) {
          reject(error)
        }
        else{
            console.log(results.rows[0]['name'])
            resolve(`A new cashier has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_waiter = (params) => {
    return new Promise(function(resolve, reject) {
      const { email, name, contact, address, password, salary,  rating } = params
      pool.query('INSERT INTO waiter (email, name, contact, address, password, salary, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [email, name, contact, address, password, salary,rating], (error, results) => {
        if (error) {
          reject(error)
        }
        else{
            console.log(results.rows[0]['name'])
            resolve(`A new waiter has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_supplier = (params) => {
    return new Promise(function(resolve, reject) {
      const { email, name, contact, address, password, preference } = params
      pool.query('INSERT INTO supplier (email, name, contact, address, password, preference) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [email, name, contact, address, password, preference], (error, results) => {
        if (error) {
          reject(error)
        }
        else{
            console.log(results.rows[0]['name'])
            resolve(`A new supplier has been added: ${results.rows[0]['email']}`)
        }
      })
    })
}

const create_item = (params) => {
  return new Promise(function(resolve, reject) {
    const { email, name, contact, address, password, preference } = params
    pool.query('INSERT INTO supplier (email, name, contact, address, password, preference) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [email, name, contact, address, password, preference], (error, results) => {
      if (error) {
        reject(error)
      }
      else{
          console.log(results.rows[0]['name'])
          resolve(`A new supplier has been added: ${results.rows[0]['email']}`)
      }
    })
  })
}

const login_user = (params) => {
    return new Promise(function(resolve, reject) {
      const { email,password} = params
      pool.query(`select email, password from owner where email = $1  and password = $2 union select email, password from manager where email = $1 and password = $2 union select email, password from chef where email = $1 and password = $2 union select email, password from delivery_person where email = $1 and password = $2 union select email, password from delivery_person
        where email = $1 and password = $2 union select email, password from cashier where email = $1 and password = $2 union select email, password from waiter where email = $1 and password = $2 union select email, password from customer where email = $1 and password = $2`, [email, password], (error, results) => {
        if (error) {
            resolve({auth:false, message:"login failed"})
        }
        else{
            if(results.rows[0]){
                const token = jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "1800s"});
                resolve({auth:true, token:token, result:results.rows[0], message:"successful login"})
            }
            else{
               resolve({auth:false, message:"login failed"})
            }
        }
      })
    })
}

module.exports = {
    create_customer,
    create_owner,
    create_manager,
    create_chef,
    create_delivery_person,
    create_cashier,
    create_waiter,
    create_supplier,
    login_user
}