const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const display_orders = (customer_id) => {

        return new Promise((resolve, reject) => {
            
            pool.query(`
            SELECT * FROM food_order where customer_id = $1`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
}

const display_order = (customer_id, order_id) => {

        return new Promise((resolve, reject) => {

            pool.query(`
            SELECT * FROM food_order where customer_id = $1 and order_id = $2`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
}
module.exports = {pool, display_orders, display_order};