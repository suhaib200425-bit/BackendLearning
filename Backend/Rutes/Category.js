const express = require('express');
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../Controller/CategoryController.js');
const upload = require('./Multer/Multer.js');
const CategoryRouter = express.Router();


CategoryRouter.post('/upload', upload.single("image"), addCategory)
CategoryRouter.delete("/delete/:id", deleteCategory);
CategoryRouter.patch("/update/:id", upload.single("image"), updateCategory);
CategoryRouter.get('/', getCategory)

module.exports = CategoryRouter;