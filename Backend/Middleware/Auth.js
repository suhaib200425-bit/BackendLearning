const jwt = require("jsonwebtoken");

const authMiddleware = (SECRET) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.json({ status: false, message: "No token provided" });

        try {
            const decoded = jwt.verify(token, `${SECRET}_JWT_SECRET`);
            req.user = decoded; // user info attach 
            next();
        } catch (err) {
            return res.json({ status: false, message: "Invalid token", Error: err });
        }
    }
};

module.exports = authMiddleware;