const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err)=>{
    if  (err) {
         console.error('error connecting: '+ err.stack);
         return;
        }

    console.log('db connected as id ' + connection.threadId);
});


module.exports = connection;