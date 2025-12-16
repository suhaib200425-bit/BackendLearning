const express = require('express');
const { addtocart, getCart, deleteCart } = require('../Controller/CartController');
const authMiddleware = require('../Middleware/Auth');
const CartRoute = express.Router();

CartRoute.post('/add/:id/:quantity',authMiddleware('USER'),addtocart)
CartRoute.get('/',authMiddleware('USER'),getCart)
CartRoute.delete('/delete/:id',deleteCart)

module.exports = CartRoute;  