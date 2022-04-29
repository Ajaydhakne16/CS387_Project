const Pool =require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const chef_details = (customer_id) => {

        return new Promise((resolve, reject) => {
            
            pool.query(`
            SELECT * FROM chef;`,
(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
                
            });
        });
}

const cashier_details = (customer_id) => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        SELECT * FROM cashier;`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

const waiter_details = (customer_id) => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        SELECT * FROM waiter;`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

const deliver_person_details = (customer_id) => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        SELECT * FROM delivery_person;`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

const manager_details = (customer_id) => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        SELECT * FROM manager;`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

const owner_details = (customer_id) => {

    return new Promise((resolve, reject) => {
        
        pool.query(`
        SELECT * FROM owner;`,
(error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}
module.exports = {pool, chef_details, cashier_details, waiter_details, deliver_person_details, manager_details,owner_details};
