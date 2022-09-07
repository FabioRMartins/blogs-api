const express = require('express');

const categoriesController = require('../controllers/categoriesController');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/', tokenValidation.tokenValidation, categoriesController.createCategories);
route.get('/', tokenValidation.tokenValidation, categoriesController.getAllCategories);

module.exports = route;