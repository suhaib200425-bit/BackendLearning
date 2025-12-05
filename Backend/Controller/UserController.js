
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../DB/db.js');


exports.register = async (req, res) => {
    try {
        const username = req.body.name
        const { email, password } = req.body
        if (!req.body) return res.json({ status: false, message: 'Body Is Not Read' })
        //hashing 
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 → salt roundsconst 
        const userquery = 'INSERT INTO users ( username, email,password) VALUES (?,?,?)'
        db.query(userquery, [username, email, hashedPassword], (err, user) => {
            if (err) return res.json({ status: false, message: 'user Existed', Error: err })
            res.json({ status: true, message: 'Registration Is Completed' })
        })
    } catch (err) { res.json({ status: false, message: err }) }

}

exports.login = async (req, res) => {
    try {
        if (!req.body) return res.json({ status: false, message: 'Body Is Not Available' })
        const { email, password } = req.body
        const userquery = `SELECT * FROM users WHERE email = ?`
        db.query(userquery, [email], (err, user) => {
            if (err) return res.json({ status: false, message: 'user Existed', Error: err })
            console.log(user);
            const IsMatch = bcrypt.compare(password, user[0].password);
            if (!IsMatch) return res.json({ status: false, message: 'Login Faild Password Is Not Match' })
            const token = jwt.sign(
                {
                    id: user[0].id,
                    email: user[0].email
                },
                process.env.JWT_SECRET_USER,
                { expiresIn: '1d' }
            );
            res.json({
                status: true,
                message: "user Login successful",
                token: token,
            });
        })

    }
    catch (err) {
        res.json({ status: false, message: err })
    }
}

exports.getfun = async (req, res) => {
    try {
        const { email } = req.user
        const getuserquery = `SELECT id,username,email FROM users WHERE email = ?`;
        db.query(getuserquery, [email], (err, user) => {
            if (err) return res.json({ status: false, message: err })
            if (user.length == 0) return res.json({ status: false, message: 'user Is Not De Founded' })
            res.json({ status: true, message: 'UserExist', User: user[0] })
        })
    } catch (err) {
        res.json({ status: false, message: 'Sorry', Error: err })
    }
}