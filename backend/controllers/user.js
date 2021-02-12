const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { json } = require('body-parser');

exports.signup = (req, res, next) => {
    const body= req.body ;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    
    userModel.createUser(body,(err, results)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection failed"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
            message: "You account has been successfully created!"
        })
    })
      
}
exports.findUserById = (req, res, next) => {
    const id = req.params.id;
    userModel.getUserById(id,(err,results) => {
        if(err) {
            console.log(err);
            return;
        };
        if(!results){
            return res.json({
                success: 0,
                message: "User not found"
            });
        }
        return res.json({
            success: 1,
            data: results
        })
    })
};

exports.findAllUsers = (req, res, next) => {
    userModel.getUsers((err, results) => {
        if(err) {
            console.log(err);
            return
        }
        return res.json({
            success: 1,
            data: results
        })
    })
};

exports.updateUser = (req, res, next) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    userModel.updateUser(body,(err, results) => {
        if( err) {
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                success:0,
                message: " Failed to update"
            }) 
        }
        return res.json({
            success: 1,
            message: "Your account details updated successfully"
        })
    })
};

exports.deleteUser = (req, res, next) => {
    const body = req.body;
    userModel.deleteUser(body, (err, results) => {
        if(err) {
            console.log(err)
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: "no record found"
            })
        }
        return res.json({
            success: 1,
            message: "User account deleted successfully"
        })
    })
}

exports.login = (req, res, next) => {
    const body = req.body

    userModel.getUserByEmail(body.email, (err, results) => {
        if (err) {
            console.log(err);
        }
        if(!results){
           return res.json({
                success: 0,
                message: " Invalid email id or password"
            });
        }
        const result = bcrypt.compareSync(body.password, results.password);
        if (result) {
            results.password = undefined;
            const jsontoken = jwt.sign({result: results},process.env.JSONTOKEN,{
                expiresIn: "1h"
            });
            return res.json({
                success: 1,
                message: " logged in successfully",
                token: jsontoken
            });
        } else {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            })
        }
    })
};