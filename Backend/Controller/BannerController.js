const BannerModel = require("../Models/BannerModel")

exports.addbanner = async (req, res) => {
    try {
        if (req.body) {
            const Banner = BannerModel({
                category: req.body.category,
                order: req.body.order,
                Image: req.file.filename 
            })
            await Banner.save()
            res.json({ status: true, message: "Banner Added Successful", })
        } else {
            res.json({ status: false, message: 'Body Not Available' })
        }
    } catch (err) {
        res.json({ status: false, message: err })
    }
}
exports.getbanner = async (req, res) => {
    try {
        const Banners = await BannerModel.find()
        res.json(Banners,{status:true})
    }catch(err){
        res.json({status:true,message:"Banners Is Not Available"})
    }
}