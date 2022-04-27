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
const handle_query2 = () => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        SELECT * FROM customer`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
            
        });
    });
}
const handle_query3 = (customer_id) => {
    
    return new Promise((resolve, reject) => {
        
        pool.query(`
        SELECT * FROM customer where customer.email = $1`,[customer_id],
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
            
        });
    });
}
module.exports = {pool,handle_query,handle_query1,handle_query2,handle_query3};