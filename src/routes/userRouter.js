const express = require('express');
const validation = require('../middlewares/userValidation');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', validation, userController.createUser);

module.exports = router;