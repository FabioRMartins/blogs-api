const express = require('express');

const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/', tokenValidation.tokenValidation,
 postValidation.postValidation, postController.createPost);

module.exports = route;