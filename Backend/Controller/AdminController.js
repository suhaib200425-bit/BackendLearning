const AdminModel = require('../Models/AdminModel.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.adminregister = async (req, res) => {
    try {
        if (req.body) {
            //hashing 
            const hashedPassword = await bcrypt.hash(req.body.password, 10);  // 10 → salt rounds
            const admin = new AdminModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })
            const Live = await AdminModel.findOne({ email: req.body.email });
            !Live ? await admin.save() : res.json({ status: false, message: "Admin Existed", })
            res.json({ status: true, message: "Admin Registion Successful", });
        } else res.json({ status: false, message: 'Body Is Not Read' })

    } catch (err) { res.json({ status: false, message: err }) }

}

exports.adminlogin = async (req, res) => {
    try {
        if (req.body) {
            const { email, password } = req.body
            const Live = await AdminModel.findOne({ email: email });
            if (Live) {
                const IsMatch = bcrypt.compare(password, Live.password);
                if (!IsMatch) res.json({ status: false, message: 'Login Faild' })
                const token = jwt.sign(
                    {
                        id: Live._id,
                        email: email
                    },
                    'ADMIN_JWT_SECRET',
                    { expiresIn: '1d' }
                );
                res.json({
                    status: true,
                    message: "Admin Login successful",
                    token: token,
                });
            }
            else res.json({ status: false, message: 'Admin Is Not Register' })
        }
    }
    catch (err) {
        res.json({ status: false, message: err })
    }
}

exports.getadmin = async (req, res) => {
    try {
        const User = await AdminModel.findOne({ email: req.user.email, _id: req.user.id });
        res.json({status:true,message:'UserExist',User})
    } catch (err) {
        res.json({ status: false, message: 'Sorry', Error: err })
    }
}