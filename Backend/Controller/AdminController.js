
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../DB/db.js');


exports.adminregister = async (req, res) => {
    try {
        const username = req.body.name
        const { email, password } = req.body
        if (!req.body) return res.json({ status: false, message: 'Body Is Not Read' })
        //hashing 
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 → salt roundsconst 
        const adminquery = 'INSERT INTO admins ( username, email,password) VALUES (?,?,?)'
        db.query(adminquery, [username, email, hashedPassword], (err, admin) => {
            if (err) return res.json({ status: false, message: 'Admin Existed', Error: err })
            res.json({ status: true, message: 'Registration Is Completed' })
        })
        // const Live = await AdminModel.findOne({ email: req.body.email });
        // !Live ? await admin.save() : res.json({ status: false, message: "Admin Existed", })
        // res.json({ status: true, message: "Admin Registion Successful", });


    } catch (err) { res.json({ status: false, message: err }) }

}

exports.adminlogin = async (req, res) => {
    try {
        if (!req.body) return res.json({ status: false, message: 'Body Is Not Available' })
        const { email, password } = req.body
        const adminquery = `SELECT * FROM admins WHERE email = ?`
        db.query(adminquery, [email], (err, admin) => {
            if (err) return res.json({ status: false, message: 'Admin Existed', Error: err })
            console.log(admin);
            const IsMatch = bcrypt.compare(password, admin[0].password);
            if (!IsMatch) return res.json({ status: false, message: 'Login Faild Password Is Not Match' })
            const token = jwt.sign(
                {
                    id: admin[0].id,
                    email: admin[0].email
                },
                process.env.JWT_SECRET_ADMIN,
                { expiresIn: '1d' }
            );
            res.json({
                status: true,
                message: "Admin Login successful",
                token: token,
            });
        })

    }
    catch (err) {
        res.json({ status: false, message: err })
    }
}

exports.getadmin = async (req, res) => {
    try {
        const { email } = req.user
        const getadminquery = `SELECT id,username,email FROM admins WHERE email = ?`;
        db.query(getadminquery, [email], (err, admin) => {
            if (err) return res.json({ status: false, message: err })
            if (admin.length == 0) return res.json({ status: false, message: 'Admin Is Not De Founded' })
            res.json({ status: true, message: 'UserExist', User: admin[0] })
        })
    } catch (err) {
        res.json({ status: false, message: 'Sorry', Error: err })
    }
}