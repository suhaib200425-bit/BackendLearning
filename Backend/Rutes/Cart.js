const express = require('express');
const { addtocart, getCart } = require('../Controller/CartController');
const authMiddleware = require('../Middleware/Auth');
const CartRoute = express.Router();

CartRoute.post('/add/:id/:quantity',authMiddleware('USER'),addtocart)
CartRoute.get('/',authMiddleware('USER'),getCart)


module.exports = CartRoute;  