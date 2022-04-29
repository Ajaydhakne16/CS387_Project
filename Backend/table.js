const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const show_tables = () => {

        return new Promise((resolve, reject) => {            
            pool.query(`
            SELECT * FROM food_table where table_num not in (SELECT table_num FROM books where now() - timestamp < interval '2 hour')`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        
}
module.exports = {pool,show_tables};