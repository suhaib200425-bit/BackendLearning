
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../DB/db.js');
const nodemailer = require("nodemailer");
require("dotenv").config();
require('../Auth/Nodemailer.js')


exports.login = async (req, res) => {
    try {
        if (!req.body.email && !req.body.password) return res.json({ status: false, message: 'Body Is Not Available' })
        const { email, password } = req.body
        const userquery = `SELECT * FROM users WHERE email = ?`
        db.query(userquery, [email], async (err, result) => {
            if (err) return res.json({ status: false, message: err.message, Error: err })
            if (result.length == 0) return res.json({ status: false, message: 'User Existed' })

            const USER = result[0]
            console.log(USER);
            const IsMatch = await bcrypt.compare(password, USER.password);
            if (!IsMatch) return res.json({ status: false, message: 'Login Faild Password Is Not Match' })
            const token = jwt.sign(
                {
                    id: USER.id,
                    email: USER.email
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

const otpstore = {}
exports.sentotp = async (req, res) => {

    const { email } = req.body

    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000); // 6 digit
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 1 * 60 * 1000); // 10 mins
    otpstore[email] = {
        'email': req.body.email,
        'password': req.body.password,
        'username': req.body.name,
        otp, expiry
    }
    // Save OTP & expiry in DB


    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: 'suhaib200425@gmail.com',
                pass: 'abgu rnfl jdwu eern', // App password
            },
        });
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Email Verification OTP",
            html: `<h3>Your OTP is ${otp}</h3><p>Valid for 1 minutes</p>`
        });
        console.log(otpstore[email]);

        res.json({ status: true, message: "OTP sent successfully" });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
};


exports.verifyOtp = async (req, res) => {
    try {

        if (!req.body) return res.json({ status: false, message: 'Body Is Not Read' })
        const { otp,email } = req.body;

        const otpvalues = otpstore[email]
        console.log(otpvalues);

        if (!otpvalues.password) return res.json({ status: false, message: 'Password is Not bet sent' })
        if (!otpvalues)
            return res.json({ status: false, message: "User not found" });

        if (otpvalues.otp !== otp)
            return res.json({ status: false, message: "Invalid OTP" });

        if (new Date() > otpvalues.expiry)
            return res.json({ status: false, message: "OTP expired" });

        //hashing 
        const hashedPassword = await bcrypt.hash(otpvalues.password, 10);  // 10 → salt roundsconst 
        const userquery = 'INSERT INTO users ( username, email,password) VALUES (?,?,?)'
        db.query(userquery, [otpvalues.username, otpvalues.email, hashedPassword], (err, user) => {
            if (err) return res.json({ status: false, message: 'user Existed', Error: err })
            res.json({ status: true, message: 'Registration Is Completed' })
        })

    } catch (err) {
        res.json({ status:false,error: err.message });
    }
};
