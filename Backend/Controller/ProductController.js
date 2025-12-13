
const { log } = require('console');
const db = require('../DB/db.js');
const ProductModel = require('../Models/ProductModel.js')
const fs = require("fs");
const { json } = require('stream/consumers');
const { toNamespacedPath } = require('path');

exports.addproduct = async (req, res) => {
    try {
        if (!req.body) return res.json({ status: false, message: 'Body Not Available' })

        const { category, name, price, description } = req.body
        const admin_id = req.user.id;
        const productsquery = 'INSERT INTO products ( admin_id, category, name, price, description,stock) VALUES (?,?,?,?,?,?)'
        db.query(productsquery, [admin_id, category, name, price, description, true], (err, result) => {
            if (err) return res.json({ status: false, message: err.message, Error: err })

            if (!result.affectedRows) return res, json({ status: false, message: 'Product Do Not Added' })

            const imageurls = req.files?.map(file => [result.insertId, file.filename])
            const productimagesquery = 'INSERT INTO product_images (product_id, image_path) VALUES ?'
            db.query(productimagesquery, [imageurls], (err2, result2) => {
                if (err2) return res.json({ status: false, message: err2.message, Error: err2 })

                if (!result.affectedRows) return res.json({ status: false, message: 'Product Images Do Not Added' })
                let product = {};
                const getproductsquery = 'SELECT * FROM products INNER JOIN product_images ON products.id=product_images.product_id  WHERE products.id=?'
                db.query(getproductsquery, [result.insertId], (err3, result3) => {
                    if (err3) return res.json({ status: false, message: err3.message, Error: err3 })
                    if (result3.length == 0) return res.json({ status: false, message: 'Data Is Not Available' })

                    let addedproduct = {};  // map of products

                    result3.forEach(row => {

                        if (!addedproduct[result.insertId]) {
                            addedproduct[result.insertId] = {
                                id: row.product_id,
                                admin_id: row.admin_id,
                                category: row.category,
                                name: row.name,
                                price: row.price,
                                description: row.description,
                                image: []
                            };
                        }

                        if (row.image_path && row.id) {
                            addedproduct[row.product_id].image.push({
                                id: row.id,
                                image_path: row.image_path
                            });
                        }

                    });
                    res.json({ status: true, message: "Product Added", Item: addedproduct[result.insertId] })
                })

            })
        })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}


exports.getproduct = async (req, res) => {
    const getproductsquery = 'SELECT * FROM products INNER JOIN product_images ON products.id = product_images.product_id'
    db.query(getproductsquery, (err, result) => {
        if (err) return res.json({ status: false, message: err.message, Error: err })
        if (!result.length) return res.json({ status: false, message: 'Product Is Not Available' })
        const products = []
        result.forEach(row => {
            let product = products.find(item => item.id === row.product_id);
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
                products.push(product)
            }
            if (product.image) {
                product.image.push({ id: row.id, image_path: row.image_path })
            }

        });
        return res.json({ status: true, message: 'Data Readed', Item: products })
    })
    // const Items = await ProductModel.find()
    // if (Items.length == 0) res.json({ status: false, message: 'item is not found' })
    // res.json({ status: true, message: 'Data Available', Items })
}

exports.deleteproduct = async (req, res) => {
    try {
        const DOCID = req.params.id
        const ProductImagesDeletingQuery = 'SELECT image_path  FROM product_images WHERE product_id = ?'
        db.query(ProductImagesDeletingQuery, [DOCID], (err1, Images) => {
            if (err1) return res.json({ status: false, message: 'error2' + err1.message, Error: err1 })
            // if (!Images.length) return res.json({ status: false, message: 'images not found' })
            // Delete Products from DB
            const ProductDeletingQuery = 'DELETE FROM products WHERE id = ?'
            db.query(ProductDeletingQuery, [DOCID], (err2, Products) => {
                if (err2) return res.json({ status: false, message: 'error2' + err2.message, Error: err2 })
                if (!Products.affectedRows) return res.json({ status: false, message: 'Products not found' })

                // Delete file from folder   
                Images.forEach(item => {
                    fs.unlink(`uploads/${item.image_path}`, (err) => {
                        if (err) console.log("File already deleted or not found");
                    });
                })
                return res.json({ status: true, message: 'Product Deleted' })
            })

        })
    } catch (err) {
        res.json({ status: false, message: 'Catch =' + err.message });
    }
}

exports.updateproduct = async (req, res) => {
    // 
    try {
        const docid = req.params.id
        const admin_id = req.user.id
        const { category, name, price, description } = req.body
        const ProductUdateQuery = ` UPDATE products SET admin_id=? , category = ?, name = ?, price = ?, description = ?, stock = ? WHERE id = ?`
        db.query(ProductUdateQuery, [admin_id, category, name, price, description, true, docid], (err, updateproduct) => {
            if (err) return res.json({ status: false, message: "1" + err.message, Error: err })
            if (!updateproduct.affectedRows) return res.json({ status: false, message: 'Products not found' })
            const productimagesquery = 'INSERT INTO product_images (product_id, image_path) VALUES (?,?)'

            req.files?.forEach(file => {
                db.query(productimagesquery, [docid, file.filename], (err5, result5) => {
                    if (err5) console.log(err5);
                });
            })
            db.query('SELECT * FROM products INNER JOIN product_images ON products.id = product_images.product_id WHERE products.id=?', [docid], (err2, result) => {
                if (err2) return res.json({ status: false, message: 'err2' + err2.message, Error: err2 })

                let addedproduct = {};  // map of products
                result.forEach(row => {
                    if (!addedproduct[docid]) {
                        addedproduct[docid] = {
                            id: row.product_id,
                            admin_id: row.admin_id,
                            category: row.category,
                            name: row.name,
                            price: row.price,
                            description: row.description,
                            image: []
                        };
                    }

                    if (row.image_path && row.id) {
                        addedproduct[docid].image.push({
                            id: row.id,
                            image_path: row.image_path
                        });
                    }

                });
                res.json({ status: true, message: "Product Updated", Item: addedproduct[docid] })
            })
        })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

exports.getsignleproduct = async (req, res) => {
    const docname = req.params.name 
    const getproductsquery = 'SELECT * FROM products INNER JOIN product_images ON products.id = product_images.product_id WHERE products.name=?'
    db.query(getproductsquery, [docname], (err2, result) => {
        if (err2) return res.json({ status: false, message: 'err2' + err2.message, Error: err2 })

        let addedproduct = {};  // map of products
        result.forEach(row => {
            if (!addedproduct[docname]) {
                addedproduct[docname] = {
                    id: row.product_id,
                    admin_id: row.admin_id,
                    category: row.category,
                    name: row.name,
                    price: row.price,
                    description: row.description,
                    image: []
                };
            }

            if (row.image_path && row.id) {
                addedproduct[docname].image.push({
                    id: row.id,
                    image_path: row.image_path
                });
            }

        });
        res.json({ status: true, message: "Product Availble", Item: addedproduct[docname] })
    })
}