const express = require('express');
const { getfun, login, sentotp, verifyOtp } = require('../Controller/UserController.js');
const authMiddleware = require('../Middleware/Auth.js');

const UserRoute = express.Router();

UserRoute.post('/verifyOtp',verifyOtp)
UserRoute.post('/login', login)
UserRoute.get('/', authMiddleware('USER'), getfun)
UserRoute.post('/send-otp',sentotp)

module.exports = UserRoute;