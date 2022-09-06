const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const validation = require('../middlewares/categoriesValidation');
const { tokenValidation } = require('../middlewares/auth');

const categoriesRouter = Router();

categoriesRouter.post(
    '/', tokenValidation, validation, categoriesController.createCategories,
);

module.exports = categoriesRouter;