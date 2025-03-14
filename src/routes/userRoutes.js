const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/users', userController.getAllUsers);
router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.get('/users/:id', userController.getUserById)
router.delete('/users/:id', userController.deleteUser)

module.exports = router;
