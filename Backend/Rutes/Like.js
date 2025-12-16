const express = require('express');
const authMiddleware = require('../Middleware/Auth');
const { addtolike, getLike, deleteLike } = require('../Controller/LikeController');
const LikeRoute = express.Router();

LikeRoute.post('/add/:id',authMiddleware('USER'),addtolike)
LikeRoute.get('/',authMiddleware('USER'),getLike)
LikeRoute.delete('/delete/:id',deleteLike)


module.exports = LikeRoute;  