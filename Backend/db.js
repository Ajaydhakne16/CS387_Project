const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const handle_query = () => {

        return new Promise((resolve, reject) => {
            
            pool.query(`
            SELECT * FROM item`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
}
module.exports = {pool,handle_query};