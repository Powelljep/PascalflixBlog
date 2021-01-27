const express = require('express');
const router = express.Router();
const validate = require("../auth/token_validation");

const userCtrl = require('../controllers/user');

router.post('/signup',validate.checkToken, userCtrl.signup);
router.post('/login',, userCtrl.login); 
router.get('/',validate.checkToken, userCtrl.findAllUsers);
router.get('/:id',validate.checkToken, userCtrl.findUserById);
router.patch('/:id',validate.checkToken,  userCtrl.updateUser);
router.delete('/:id',validate.checkToken, userCtrl.deleteUser)

module.exports = router;