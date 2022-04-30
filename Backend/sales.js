const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const sales_details = (customer_id) => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        select extract(DAY from timestamp) as day,sum(price) as price 
        ,count(order_id) as orders from food_order group by day order by day;
`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}
const list_items_count = () => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        with X(item_id,c) as (select item_id,count(order_id) 
        from order_contain group by item_id) select item.item_id,c from item ,X where item.item_id = X.item_id order by c desc;`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
            
            
        });
    });
}

module.exports ={pool,sales_details,list_items_count}