const UserModel = require("../Models/UserModel.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
    try {
        if (req.body) {
            const Live = await UserModel.findOne({ email: req.body.email });
            if (Live) res.json({ status: false, message: 'User exist ' })

            //hashing 
            const hashedPassword = await bcrypt.hash(req.body.password, 10);  // 10 → salt rounds

            User = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                dateofbirth: req.body.dateofbirth,
                address: req.body.address,
                place: req.body.place,
                pincode: req.body.pincode,
            })
            await User.save()
            res.json({
                status: true,
                message: 'User Created successfully '
            })
        } else {
            res.json({
                status: true,
                message: 'body data is not available'
            })
        }
    } catch {
        (err) => {
            res.json({
                status: false,
                message: err
            })
            console.log(err)
        };
    }
}

exports.login = async (req, res) => {
    try {
        if (req.body) {
            const { email, password } = req.body
            const Live = await UserModel.findOne({ email: email });
            if (Live) {
                const IsMatch = bcrypt.compare(password, Live.password);
                if (!IsMatch) res.json({ status: false, message: 'Login Faild' })
                const token = jwt.sign(
                    {
                        id: Live._id,
                        email: email
                    },
                    'USER_JWT_SECRET',
                    { expiresIn: 60 }
                );
                res.json({
                    status: true,
                    message: "Login successful",
                    token: token,
                });
            }
            else res.json({ status: false, message: 'User Is Not Register' })
        }
    }
    catch (err) {
        res.json({ status: false, message: err })
    }
}

exports.getfun = async (req, res) => {
    console.log(req.user);
    const User = await UserModel.findOne({ email: req.user.email, _id: req.user.id });
    res.json(User)
}
