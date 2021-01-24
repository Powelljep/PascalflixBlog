const connection = require('../config/database');

exports.createUser = (data, callback) => {
        connection.query(
            `INSERT INTO users (firstname, lastname, email, password, username) 
                VALUES(?,?,?,?,?)`,
            [
                data.firstname,
                data.lastname,
                data.email,
                data.password,
                data.username
            ],
            (err, results, fields) => {
                if(err){
                    return callback(err);
                } 
                return callback(null, results);
            }
        )
    }
exports.findUser = (userId, callback) => {
    connection.query(
        `SELECT * FROM users WHERE email = ?`,
        [],
        (err, results, fields) => {
            if (err){
                return callback (err);
            }
            return callback(null, results);
        }
    )
}

