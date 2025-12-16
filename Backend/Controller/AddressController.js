const db = require("../DB/db.js")
exports.addaddress = async (req, res) => {
    try {
        const UserId = req.user.id
        const { full_name, address, mark, city, state, pincode, country } = req.body
        const resetQuery = `UPDATE addresses SET is_default = 0 WHERE user_id = ?`;

        db.query(resetQuery, [UserId], (err) => {
            if (err) return res.json({ status: false, message: err.message, ERROR: err })
            const addquery = `INSERT INTO addresses(user_id, full_name, address, mark, city, state, pincode, country, is_default) VALUES (?,?,?,?,?,?,?,?,?)`
            db.query(addquery, [UserId, full_name, address, mark, city, state, pincode, country, 1], (err2, result2) => {
                if (err2) return res.json({ status: false, message: err2.message, ERROR_2: err2 })
                if (result2.insertId) {
                    const address = 'SELECT * FROM addresses WHERE id=?'
                    db.query(address, [result2.insertId], (err3, result3) => {
                        if (err3) return res.json({ status: false, message: err3.message, ERROR_3: err3 })
                        if (!result3.length) return res.json({ status: false, message: 'Not Be Founded' })
                        return res.json({ status: true, message: 'Reding okey', Item: result3[0] })
                    })
                }
            })
        })

    } catch (err) {
        return res.json({ status: false, message: err.message, ERROR: err })
    }
}
exports.getdefaultaddress = async (req, res) => {
    const UserId = req.user.id
    const defaltaddress = `SELECT * FROM addresses WHERE user_id = ? AND is_default = 1 LIMIT 1`
    db.query(defaltaddress, [UserId], (err, result) => {
        if (err) return res.json({ status: false, message: err.message, ERROR: err })
        if (!result.length) return res.json({ status: false, message: 'address in not available' })
        return res.json({ status: true, message: 'Address Available', Item: result[0] })
    })
}

exports.getalladdress = async (req, res) => {
    const UserId = req.user.id
    const defaltaddress = `SELECT * FROM addresses WHERE user_id = ?`
    db.query(defaltaddress, [UserId], (err, result) => {
        if (err) return res.json({ status: false, message: err.message, ERROR: err })
        if (!result.length) return res.json({ status: false, message: 'address in not available' })
        return res.json({ status: true, message: 'Address Available', Item: result})
    })
}