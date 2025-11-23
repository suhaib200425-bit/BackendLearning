
const ProductModel = require('../Models/ProductModel.js')
const fs = require("fs");

exports.addproduct = async (req, res) => {
    try {
        if (req.body) {
            const imageurls = req.files?.map(file => file.filename)
            const Product = ProductModel({
                admin_id: req.body.user,
                category: req.body.category,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: imageurls
            })
            await Product.save()
            res.json({ status: true, message: "Product Added Successful", })
        } else {
            res.json({ status: false, message: 'Body Not Available' })
        }
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}


exports.getproduct = async (req, res) => {
    const Items = await ProductModel.find()
    if (Items.length == 0) res.json({ status: false, message: 'item is not found' })
    res.json({ status: true, message: 'Data Available', Items })
}

exports.deleteproduct = async (req, res) => {
    try {
        const Product = await ProductModel.findById(req.params.id);
        if (!Product) return res.status(404).json({ status: false, message: "Product not found" });

        // Delete file from folder
        Product.image.map(image => {
            fs.unlink(`uploads/${image}`, (err) => {
                if (err) console.log("File already deleted or not found");
            });
        })

        // Delete from DB
        await ProductModel.findByIdAndDelete(req.params.id);

        res.json({ status: true, message: "Product deleted successfully" });

    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}

exports.updateproduct = async (req, res) => {
    const imageurls = req.files?.map(file => file.filename)
    const docid=req.params.id
    const Product = await ProductModel.findById(docid);
    if (!Product) return res.status(404).json({ status: false, message: "Product not found" });

    const UpdateObj = imageurls ? {
        image: [...Product.image,...imageurls],
        ...req.body
    } : { ...req.body }
    const updatedBanner = await ProductModel.findByIdAndUpdate(
        docid,
        UpdateObj,
        { new: true } // returns updated data
    );

    return res.status(200).json({ status: true, message: "Product is founded", item: updatedBanner })
}