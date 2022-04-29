const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const display_menu = () => {

        return new Promise((resolve, reject) => {
            
            pool.query(`
            SELECT name, price, rating FROM item`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
}

const display_item_details = (item_id) => {

        return new Promise((resolve, reject) => {

            pool.query(`
            SELECT a.name, price, type, category, availability, rating, b.name FROM (SELECT * FROM item) as a JOIN (SELECT * FROM made_of NATURAL JOIN ingredient) as b ON a.item_id = b.item_id WHERE a.item_id = $1`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
}
module.exports = {pool, display_menu, display_item_details};