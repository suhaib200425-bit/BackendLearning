
const CategoryModel =require('../Models/CategoryModel.js')
const fs = require("fs");

exports.addCategory = async (req, res) => {
    try {
        if (req.body) {
            const Category = CategoryModel({
                admin_id: req.body.user,
                category: req.body.category,
                image: req.file.filename
            })
            await Category.save()
            res.json({ status: true, message: "Banner Added Successful", })
        } else {
            res.json({ status: false, message: 'Body Not Available' })
        }
    } catch (err) {
        res.json({ status: false, message: 'Error' })
    }
}
exports.getCategory = async (req, res) => {
    const Item = await CategoryModel.find()
    if (Item.length == 0) res.json({ status: false, message: "Banners Is Not Available" })
    res.json({ status: true, Item })

}

exports.deleteCategory = async (req, res) => {
    try {
        const Category = await CategoryModel.findById(req.params.id);
        if (!Category) return res.status(404).json({ status: false, message: "Banner not found" });

        // Delete file from folder
        fs.unlink(`uploads/${Category.image}`, (err) => {
            if (err) console.log("File already deleted or not found");
        });

        // Delete from DB
        await CategoryModel.findByIdAndDelete(req.params.id);

        res.json({ status: true, message: "Banner deleted successfully" });

    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const userId = req.params.id;
        // const imageupdate= req.body.image?req.file.filename:''
        const UpdateObj = req.file ? {
            image: req.file.filename,
            ...req.body
        } : { ...req.body }
        
        const DATA = await CategoryModel.findById(userId);
        fs.unlink(`uploads/${DATA.image}`, (err) => {
            if (err) console.log("File already deleted or not found");
        });

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            userId,
            UpdateObj,
            { new: true } // returns updated data
        );

        if (!updatedCategory) {
            return res.status(404).json({ msg: "Banner not found" });
        }

        res.json({
            status: true,
            msg: "Banner updated successfully",
            response: updatedCategory
        });


    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
}