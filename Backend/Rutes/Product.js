const express = require('express');
const ProductRoute = express.Router();
const upload = require('./Multer/Multer.js');
const { addproduct, getproduct, deleteproduct, updateproduct } = require('../Controller/ProductController.js');

ProductRoute.post('/upload',upload.array("images",10),addproduct)
ProductRoute.get('/',getproduct)
ProductRoute.delete("/delete/:id", deleteproduct);
ProductRoute.patch("/update/:id",upload.array("images",5),updateproduct );

module.exports = ProductRoute;  