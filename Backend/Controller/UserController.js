const UserModel = require("../Models/UserModel")

exports.register = async (req, res) => {
    try {
        if (req.body) {
            User = new UserModel({
                name: req.body.name,
                email: req.body.email,
                dateofbirth: req.body.dateofbirth,
                address: req.body.address,
                place: req.body.place,
                pincode: req.body.pincode,
            })
            await User.save()
            res.json({
                status: true,
                message: 'User Created successfully ✅'
            })
        }else{
            res.json({
                status: true,
                message: ' push data not  ❌'
            })
        }
    } catch {
        (err) => {
            res.json({
                status: false,
                message: 'User Not Be Created ❌'
            })
            console.log(err)
        };
    }
}

exports.getfun = async(req, res) => {
    const alluser=await UserModel.find()
    res.json(alluser)
}
