const { Router } = require('express');
const userController = require('../controllers/userController');
const tokenValidation = require('../middlewares/tokenValidation');

const loginRouter = Router();

loginRouter.post('/', tokenValidation.tokenValidation, userController.login);

module.exports = loginRouter;