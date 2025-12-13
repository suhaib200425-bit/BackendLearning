
const db = require('../DB/db.js');



exports.addtocart = (req, res) => {
    const ProductId = Number(req.params.id)
    const Quantity = Number(req.params.quantity)
    const UserId = req.user.id

    const productrow = 'SELECT * FROM carts WHERE user_id = ? AND product_id = ?'
    db.query(productrow, [UserId, ProductId], (err1, result1) => {

        if (err1) return res.json({ status: false, message: err1.message, ERROR_1: err1 })

        if (result1.length != 0) return res.json({status:false,message:'allready existed'})
            addcartquery = `INSERT INTO carts (user_id, product_id) VALUES (?,?)`
            db.query(addcartquery, [UserId, ProductId], (err2, result2) => {
                if (err2) return res.json({ status: false, message: err2.message, ERROR_2: err2 })
                const cartrow = 'SELECT * FROM carts WHERE id = ?'
                db.query(cartrow, [result2.insertId], (err4, result4) => {
                    if (err4) return res.json({ status: false, message: err4.message, ERROR_4: err4 })
                    if (result4.length == 0) return res.json({ status: false, message: 'Cart Item Not Founded' })

                    const productrow = 'SELECT * FROM products INNER JOIN product_images ON products.id = product_images.product_id WHERE products.id=?'
                    let Cart = {
                        id: result4[0].id,
                        quantity: result4[0].quantity,
                    }
                    db.query(productrow, [result4[0].product_id], (err5, result5) => {
                        if (err5) return res.json({ status: false, message: err5.message, ERROR_5: err5 })
                        if (result5.length == 0) return res.json({ status: false, message: 'Cart Item Not Founded' })
                        result5.forEach(element => {
                            if (!Cart.product) {
                                Cart = {
                                    ...Cart,
                                    product: {
                                        id: element.product_id,
                                        category: element.category,
                                        name: element.name,
                                        price: element.price,
                                        description: element.description,
                                        image: []
                                    }
                                }
                            }
                            if (Cart.product && Cart.product.image) {
                                Cart.product.image.push(
                                    {
                                        image_path: element.image_path,
                                        id: element.id
                                    }
                                )
                            }
                        });

                        res.json({ status: true, message: 'Product add to Cart', Item: Cart })
                    })
                })
            })
    })


}

exports.getCart = (req, res) => {
    const userId = req.user.id
    const cartsitem = `
    SELECT 
    carts.id AS cart_id,
    carts.quantity,
    products.id AS product_id,
    products.category,
    products.name,
    products.price,
    products.description,
    product_images.image_path,
    product_images.id AS image_id
    FROM carts
    INNER JOIN products ON carts.product_id = products.id
    LEFT JOIN product_images ON products.id = product_images.product_id
    WHERE carts.user_id = ?
`
    try {
        db.query(cartsitem, [userId], async (err, result) => {
            if (err) return res.json({ status: false, message: err.message, ERROR: err })
            if (result.length === 0) return res.json({ status: false, message: 'Carts Item Is not Available' })
            // Group by carts id
            let cartMap = {};

            result.forEach(row => {
                if (!cartMap[row.cart_id]) {
                    cartMap[row.cart_id] = {
                        id: row.cart_id,
                        quantity: row.quantity,
                        product: {
                            id: row.product_id,
                            category: row.category,
                            name: row.name,
                            price: row.price,
                            description: row.description,
                            image: []
                        }
                    };
                }

                cartMap[row.cart_id].product.image.push({
                    id: row.image_id,
                    image_path: row.image_path
                });
            });

            res.json({
                status: true,
                message: "Cart loaded",
                Item: Object.values(cartMap)
            });
        })

    } catch (err6) {
        return res.json({ status: false, message: err6.message })
    }
}