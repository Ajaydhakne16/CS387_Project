const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

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
module.exports = {pool, display_users, user_details};