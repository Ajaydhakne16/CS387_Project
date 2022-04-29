const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const all_coupons = (customer_id) => {

        return new Promise((resolve, reject) => {
            
            pool.query(`select * from discount_coupon`,
                (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
                
            });
        });
}


module.exports = {
    all_coupons
}