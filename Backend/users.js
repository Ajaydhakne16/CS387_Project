const Pool =require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const getUserInfo = (email,type) => {
    return new Promise(function(resolve, reject) {
      pool.query(`select * from ${type} where email = $1`,[email], (error, results) => {
        if (error) {
            reject(error)
        }
        else {
            console.log(results.rows)
            resolve(results.rows[0]);
        }
    })
    })
}

const display_users = () => {

        return new Promise((resolve, reject) => {
            
            pool.query(`SELECT * FROM customer`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
                
            });
        });
}
const display_freq_users = () => {

    return new Promise((resolve, reject) => {
        
        pool.query(`with X(customer_id,c) as (select customer_id ,count(order_id) from food_order group by customer_id) 
        select customer.email,customer.contact,customer.address,customer.premium ,c 
        from customer,X where X.customer_id = customer.email 
        order by c desc limit 10;`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
            console.log(results);
            
        });
    });
}

const user_details = (user_id) => {
        
        return new Promise((resolve, reject) => {

            pool.query(`
            SELECT * FROM customer WHERE email = $1`,[user_id],
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
                
            });
        });
}
module.exports = {pool, display_users, user_details,display_freq_users, getUserInfo};
