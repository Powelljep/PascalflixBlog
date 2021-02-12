const express = require('express');
const router = express.Router();
const validate = require("../auth/token_validation");

const userCtrl = require('../controllers/user');

router.post('/signup',userCtrl.signup);
router.post('/login', userCtrl.login); 
router.get('/',validate.checkToken, userCtrl.findAllUsers);
router.get('/:id', userCtrl.findUserById);
router.patch('/',validate.checkToken,  userCtrl.updateUser);
router.delete('/:id',validate.checkToken, userCtrl.deleteUser)

module.exports = router;