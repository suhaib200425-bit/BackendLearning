const express = require('express');
const { addbanner, getbanner, deletebanner, updatebanner } = require('../Controller/BannerController');
const upload = require('./Multer/Multer');

const BannerRouter = express.Router();

BannerRouter.post('/upload',upload.single("image"),addbanner)
BannerRouter.delete("/delete/:id", deletebanner);
BannerRouter.patch("/update/:id",upload.single("image"),updatebanner );
BannerRouter.get('/',getbanner)


module.exports = BannerRouter;