const express = require('express');

const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/', tokenValidation.tokenValidation,
 postValidation.postValidation, postController.createPost);
 route.get('/', tokenValidation.tokenValidation, postController.getAllPosts);
 route.get('/:id', tokenValidation.tokenValidation, postController.getPostById);
 route.put('/:id', tokenValidation.tokenValidation, postValidation.updateValidation,
  postController.updatePost);
  route.delete('/:id', tokenValidation.tokenValidation, postValidation.removeValidation,
  postController.removePost);

module.exports = route;