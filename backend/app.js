const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pascalflixdb'
  })
  connection.connect();
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].solution)
  })
  
  connection.end()

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });
// app.use(bodyParser.json());+




// module.exports=app;