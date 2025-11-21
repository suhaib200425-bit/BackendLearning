const express = require('express');
const multer = require("multer");
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../Controller/CategoryController.js');

const CategoryRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // store files in /uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

CategoryRouter.post('/upload',upload.single("image"),addCategory)
CategoryRouter.delete("/delete/:id", deleteCategory);
CategoryRouter.patch("/update/:id",upload.single("image"),updateCategory );
CategoryRouter.get('/',getCategory)

module.exports = CategoryRouter;