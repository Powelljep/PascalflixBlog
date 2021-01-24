const bcryp = require('bcrypt');
const userModel = require('../models/user');

exports.signup = (req, res, next) => {
    const body = req.body;
    bcryp.hash(body.password, 10).then(
        (hash) => {
            body.password = hash;
        }
    );

    userModel.createUser(body, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection failed!"
            });
        }
        return res.status(201).json({
            success: 1,
            data: results,
            message: "Your account has been successfully created!"
        })
    });
    
};

exports.login = (req, res, next) => {

}