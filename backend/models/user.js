
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
    };

exports.getUsers = callback => {
    connection.query(
        `SELECT firstname, lastname, email, username FROM users`,
        [],
        (err, results, fields) => {
            if (err){
                return callback (err);
            }
            return callback(null, results);
        }
    )
};

exports.getUserById = (id, callback) => {
    connection.query(
        `SELECT firstname, lastname, email, username FROM users WHERE id = ? `,
        [id],
        (err, results, fields) => {
            if(err) {
                return callback(err);
            }
            return callback(null, results[0]);
        }
    )
};

exports.updateUser = (data, callback) => {
    connection.query(
        `UPDATE users SET firstname = ?, lastname = ?, email = ?, username = ? WHERE id = ?`,
        [data.firstname, data.lastname, data.email, data.username, data.id],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results[0]);
        }
    )
};

exports.deleteUser = (data, callback) => {
    connection.query(
        `DELETE FROM users WHERE id = ?`,
        [data.id],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results[0]);
        }
    )
};

exports.getUserByEmail = (email, callback) => {
    connection.query(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results[0]);
        }
    )
}

