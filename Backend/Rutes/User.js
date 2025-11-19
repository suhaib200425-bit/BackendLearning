const express = require('express');
const { register, getfun, login } = require('../Controller/UserController.js');
const authMiddleware = require('../Middleware/Auth.js');

const UserRoute = express.Router();


UserRoute.post('/register', register)
UserRoute.post('/login', login)
UserRoute.get('/', authMiddleware('USER'), getfun)

module.exports = UserRoute;