const db = require('../DB/db.js');

exports.addtolike = (req, res) => {
    const ProductId = Number(req.params.id)
    const UserId = req.user.id

    const productrow = 'SELECT * FROM likes WHERE user_id = ? AND product_id = ?'
    db.query(productrow, [UserId, ProductId], (err1, result1) => {

        if (err1) return res.json({ status: false, message: err1.message, ERROR_1: err1 })

        if (result1.length != 0) return res.json({ status: false, message: 'allready existed' })
        addcartquery = `INSERT INTO likes (user_id, product_id) VALUES (?,?)`
        db.query(addcartquery, [UserId, ProductId], (err2, result2) => {
            if (err2) return res.json({ status: false, message: err2.message, ERROR_2: err2 })
            res.json({ status: true, message: 'add like table;' })
        })
    })
}

exports.getLike = (req, res) => {
    const userId = req.user.id
    const likesitem = `
    SELECT 
    likes.id AS like_id,
    products.id AS product_id,
    products.category,
    products.name,
    products.price,
    products.description,
    product_images.image_path,
    product_images.id AS image_id
    FROM likes
    INNER JOIN products ON likes.product_id = products.id
    LEFT JOIN product_images ON products.id = product_images.product_id
    WHERE likes.user_id = ?
`
    try {
        db.query(likesitem, [userId], async (err, result) => {
            if (err) return res.json({ status: false, message: err.message, ERROR: err })
            if (result.length === 0) return res.json({ status: false, message: 'likes Item Is not Available' })
            // Group by likes id
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