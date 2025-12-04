


const fs = require("fs");
const db = require('../DB/db.js');
exports.addItem = (tablename) => {

    return (req, res) => {
        try {
            if (!req.body) res.json({ status: false, message: `${tablename} Not Available` })
            const { category } = req.body
            const ImageUrl = req.file?.filename
            const UserId = req.user.id
            
            const sql = `INSERT INTO ${tablename} (category, image, user_id) VALUES (?, ?, ?)`;
            db.query(sql, [category, ImageUrl, UserId], (err, result) => {
                if (err) {
                    return res.json({ status: false, message: err.message });
                }
                res.json({ status: true, message: `${tablename} added successfully` });
            });


        } catch (err) {
            res.json({ status: false, message: err.message })
        }
    }
}
exports.getItem = (tablename) => {
    return (req, res) => {
        db.query(`SELECT * FROM ${tablename} ORDER BY created_at DESC`, (err, result) => {
            if (err) return res.json({ status: false, message: err });

            if (result.length === 0) return res.json({ status: false, message: `${tablename} Not Available` });
            console.log(result);

            return res.json({ status: true, Item: result });
        });

    }
}

exports.deleteItem = (tablename) => {

    return async (req, res) => {
        try {
            const id = req.params.id;

            const getbannerquery = `SELECT image FROM ${tablename} WHERE id = ?`;
            db.query(getbannerquery, [id], (err, result) => {
                if (err) return res.json({ status: false, message: err });

                if (result.length === 0) {
                    return res.json({ status: false, message: `${tablename} not found` });
                }

                const imageName = result[0];
                fs.unlink(`uploads/${imageName}`, (err) => {
                    if (err) console.log("File already deleted or not found");
                });
                const deletesqlquery = `DELETE FROM ${tablename} WHERE id = ?`;
                db.query(deletesqlquery, [id], (err2, result2) => {
                    if (err2) {
                        return res.json({ status: false, message: err });
                    }
                    if (result2.affectedRows === 0) {
                        return res.json({ status: false, message: `${tablename} not found` });
                    }
                    return res.json({ status: true, message: `${tablename} deleted successfully` });
                });
            })


        } catch (err) {
            res.json({ status: false, message: err.message });
        }
    }
}

exports.updateItem = (tablename)=>{
    return async (req, res) => {
    try {
        const Id = req.params.id;
        const category = req.body.category
        const getbannerquery = `SELECT image FROM ${tablename} WHERE id = ?`;
        db.query(getbannerquery, [Id], (err, result) => {
            if (err) return res.json({ status: false, message: err })
 
            if (result.length === 0) return res.json({ status: false, message: `${tablename} Is Not Available` })
            console.log(result);

            let imageupdate
            if (req.file) {
                fs.unlink(`uploads/${result[0].image}`, (err) => {
                    if (err) console.log("File already deleted or not found");
                });
                imageupdate = req.file.filename
            } else {
                imageupdate = result[0].image
            }

            const sql = `UPDATE ${tablename} SET category = ?, image = ?, user_id = ? WHERE id = ?`;
            db.query(sql, [category, imageupdate, req.user.id, Id], (err2, result2) => {
                if (err2) return res.json({ status: false, message: err2 });

                return res.json({
                    status: true,
                    message: `${tablename} updated successfully.!`,
                    Item: result2.affectedRows
                });
            });

        })


    } catch (err) {
        res.status(500).json({ status: false, msg: "Server Error", error: err.message });
    }
}
 }