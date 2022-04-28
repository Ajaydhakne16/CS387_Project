const Pool =require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const getUserInfo = (email) => {
    return new Promise(function(resolve, reject) {
      pool.query(`select * from customer where email = $1`,[email], (error, results) => {
        if (error) {
            console.log(error);
            reject(error)
        }
        else {
            console.log(results.rows)
            resolve(results.rows[0]);
        }
    })
    })
}


module.exports = {
    getUserInfo
}