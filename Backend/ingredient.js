const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const list_ingredients = () => {
        
        return new Promise((resolve, reject) => {
            
            pool.query(`
            SELECT * FROM ingredient`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
}

const ingredient_details = (ingredient) => {

        return new Promise((resolve, reject) => {

            pool.query(`
            SELECT * FROM (SELECT * FROM ingredient) as a JOIN (SELECT * FROM supply NATURAL JOIN ingredient) as b ON a.ingredient_id = b.ingredient_id WHERE a.ingredient_id = $1`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
}
module.exports = {pool, list_ingredients, ingredient_details};