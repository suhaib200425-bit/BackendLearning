
const { log } = require('console');
const db = require('../DB/db.js');
const ProductModel = require('../Models/ProductModel.js')
const fs = require("fs");
const { json } = require('stream/consumers');

exports.addproduct = async (req, res) => {
    try {
        if (!req.body) return res.json({ status: false, message: 'Body Not Available' })

        const { category, name, price, description } = req.body
        const admin_id = req.user.id;
        const productsquery = 'INSERT INTO products ( admin_id, category, name, price, description) VALUES (?,?,?,?,?)'
        db.query(productsquery, [admin_id, category, name, price, description], (err, result) => {
            if (err) return res.json({ status: false, message: err.message, Error: err })

            if (!result.affectedRows) return res, json({ status: false, message: 'Product Do Not Added' })

            const imageurls = req.files?.map(file => [result.insertId, file.filename])
            log(imageurls)
            const productimagesquery = 'INSERT INTO product_images (product_id, image_path) VALUES ?'
            db.query(productimagesquery, [imageurls], (err2, result2) => {
                if (err2) return res.json({ status: false, message: err2.message, Error: err2 })

                if (!result.affectedRows) return res.json({ status: false, message: 'Product Images Do Not Added' })

                log(result2)
                res.json({ status: result2.insertId })
            })
        })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}


exports.getproduct = async (req, res) => {
    const getproductsquery = 'SELECT * FROM products INNER JOIN product_images'
    db.query(getproductsquery, (err, result) => {
        if (err) return res.json({ status: false, message: err.message, Error: err })
        const products = []
        result.forEach(row => {
            let product= products.find(item => item === row.product_id);
            if (!product) {
                product = {
                    id: row.product_id,
                    admin_id: row.admin_id,
                    category: row.category,
                    name: row.name,
                    price: row.price,
                    description: row.description,
                    image: []
                }
            }
            if(product.image){
                "CLASS KAZHINJ VERAM TTO"
            }
        });
        return res.json({ status: true, message: 'data is ther' })
    })
    // const Items = await ProductModel.find()
    // if (Items.length == 0) res.json({ status: false, message: 'item is not found' })
    // res.json({ status: true, message: 'Data Available', Items })
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
    const docid = req.params.id
    const Product = await ProductModel.findById(docid);
    if (!Product) return res.status(404).json({ status: false, message: "Product not found" });

    const UpdateObj = imageurls ? {
        image: [...Product.image, ...imageurls],
        ...req.body
    } : { ...req.body }
    const updatedBanner = await ProductModel.findByIdAndUpdate(
        docid,
        UpdateObj,
        { new: true } // returns updated data
    );

    return res.status(200).json({ status: true, message: "Product is founded", items: updatedBanner })
} 