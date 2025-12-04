const express = require('express');
const upload = require('./Multer/Multer');
const { addItem, deleteItem, updateItem, getItem } = require('../Controller/BannerCategoryController.js');
const authMiddleware = require('../Middleware/Auth.js');

const BannerRouter = express.Router();

BannerRouter.post('/upload',authMiddleware('ADMIN'),upload.single("image"),addItem('banner'))
BannerRouter.delete("/delete/:id", deleteItem('banner'));
BannerRouter.patch("/update/:id",authMiddleware('ADMIN'),upload.single("image"),updateItem('banner') );
BannerRouter.get('/',getItem('banner'))


module.exports = BannerRouter;