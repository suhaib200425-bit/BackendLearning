const jwt = require("jsonwebtoken");

const authMiddleware = (SECRET) => {
    return (req, res, next) => {
        const SECRETID=SECRET==="ADMIN"?process.env.JWT_SECRET_ADMIN:process.env.JWT_SECRET_USER
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.json({ status: false, message: "No token provided" });

        try {
            const decoded = jwt.verify(token, SECRETID);
            req.user = decoded; // user info attach 
            next();
        } catch (err) {
            return res.json({ status: false, message: "Invalid token", Error: err });
        }
    }
};

module.exports = authMiddleware;