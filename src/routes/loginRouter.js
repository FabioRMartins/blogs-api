const { Router } = require('express');
const loginController = require('../controllers/loginController');
const tokenValidation = require('../middlewares/tokenValidation');

const loginRouter = Router();

loginRouter.post('/', tokenValidation.tokenValidation, loginController.login);

module.exports = loginRouter;