const express = require('express');
const authMiddleware = require('../Middleware/Auth');
const { addtolike, getLike } = require('../Controller/LikeController');
const LikeRoute = express.Router();

LikeRoute.post('/add/:id',authMiddleware('USER'),addtolike)
LikeRoute.get('/',authMiddleware('USER'),getLike)


module.exports = LikeRoute;  