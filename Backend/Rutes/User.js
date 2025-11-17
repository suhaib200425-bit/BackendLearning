const express = require('express');
const { register,getfun } = require('../Controller/UserController.js');

const UserRoute = express.Router();


UserRoute.post('/register',register)
UserRoute.get('/',getfun)

module.exports =UserRoute;