const express = require('express');
const {addItem, deleteItem, updateItem, getItem } = require('../Controller/BannerCategoryController.js');
const upload = require('./Multer/Multer.js');
const authMiddleware = require('../Middleware/Auth.js');
const CategoryRouter = express.Router();


CategoryRouter.post('/upload', authMiddleware('ADMIN'),upload.single("image"), addItem('category'))
CategoryRouter.delete("/delete/:id", deleteItem('category'));
CategoryRouter.patch("/update/:id", authMiddleware('ADMIN'),upload.single("image"), updateItem('category'));
CategoryRouter.get('/', getItem('category'))

module.exports = CategoryRouter;