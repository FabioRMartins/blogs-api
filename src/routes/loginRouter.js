const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/validations');

const loginRouter = Router();

loginRouter.post('/', loginValidation.loginValidation, loginController.login);

module.exports = loginRouter;