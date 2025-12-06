const express = require('express');
const ProductRoute = express.Router();
const upload = require('./Multer/Multer.js');
const { addproduct, getproduct, deleteproduct, updateproduct } = require('../Controller/ProductController.js');
const authMiddleware = require('../Middleware/Auth.js');

ProductRoute.post('/upload',authMiddleware('ADMIN'),upload.array("images",10),addproduct)
ProductRoute.get('/',getproduct)
ProductRoute.delete("/delete/:id", deleteproduct);
ProductRoute.patch("/update/:id",authMiddleware('ADMIN'),upload.array("images",5),updateproduct );

module.exports = ProductRoute;  