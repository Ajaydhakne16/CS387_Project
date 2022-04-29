const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const list_items = () => {

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
const list_item_ingredients = (item_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        with X as 
        (select * from made_of,ingredient where made_of.item_id = $1 and made_of.ingredient_id = ingredient.ingredient_id)
        select * from X,item where X.item_id = item.item_id;
`,[item_id],
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
            
        });
    });
}

const get_max_id = () => {
    return new Promise((resolve, reject) => {
            
        pool.query(`
        select max(item_id) as item_id from item`,
            (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
            
        });
    });   
}
module.exports = {pool,list_items,list_item_ingredients,get_max_id};