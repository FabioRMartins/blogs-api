const express = require('express');

const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/', userValidation.userValidation, userController.createUser);
route.get('/', tokenValidation.tokenValidation, userController.getAllUsers);
route.get('/:id', tokenValidation.tokenValidation, userController.getUserById);
route.delete('/me', tokenValidation.tokenValidation, userController.removeUser);

module.exports = route;