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
const handle_query1 = (item_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        select * from made_of,ingredient where made_of.item_id = $1 and made_of.ingredient_id = ingredient.ingredient_id;
`,[item_id],
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
            
        });
    });
}
module.exports = {pool,handle_query,handle_query1};