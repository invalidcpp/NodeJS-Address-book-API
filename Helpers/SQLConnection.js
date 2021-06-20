var mysql = require('mysql');
require('dotenv').config()

// Create connection to mysql database using dotenv information
const pool = mysql.createPool({  
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    connectionLimit: 10,
    multipleStatements: true,
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    debug: true
});
// export connection
module.exports = pool;