const express = require('express');
const multer = require("multer");
const { addbanner, getbanner } = require('../Controller/BannerController');

const BannerRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // store files in /uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

BannerRouter.post('/upload',upload.single("image"),addbanner)
BannerRouter.get('/',getbanner)

module.exports = BannerRouter;