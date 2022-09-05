const { Router } = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/validations');

const userRouter = Router();

userRouter.post('/', userValidation.userValidation, userController.newUser);

module.exports = userRouter;