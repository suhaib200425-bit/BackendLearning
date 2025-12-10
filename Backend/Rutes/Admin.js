const express = require('express');
const { getadmin, adminregister, adminlogin } = require('../Controller/AdminController');
const authMiddleware = require('../Middleware/Auth');
const passport = require('passport')
const AdminRoute = express.Router();
const jwt = require("jsonwebtoken");

AdminRoute.post('/register', adminregister)
AdminRoute.post('/login', adminlogin)
AdminRoute.get('/', authMiddleware('ADMIN'), getadmin)

//gooogle authentication

AdminRoute.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
AdminRoute.get(
    '/google/callback',
    passport.authenticate('google',
        {
            session: false,
            failureRedirect: 'http://localhost:5173/auth'
        }),
    (req, res) => {

        const email = req.user.email;
        const username = req.user.username;
        const id = req.user.id;

        const token = jwt.sign(
            { id, email, username },
            process.env.JWT_SECRET_ADMIN,
            { expiresIn: '1d' }
        );
        // Send token to frontend
        res.redirect(`http://localhost:5173/?token=${token}`)
    })

//facebooke authentications
AdminRoute.get("/facebook", passport.authenticate("facebook",{scope:['email']}));

AdminRoute.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        session: false,
        failureRedirect: `http://localhost:5173/auth`,
    }),(req,res)=>{
        console.log(req.user);
        const email = req.user.email;
        const username = req.user.username;
        const id = req.user.id;

        const token = jwt.sign(
            { id, email, username },
            process.env.JWT_SECRET_ADMIN,
            { expiresIn: '1d' }
        );
        res.redirect(`http://localhost:5173/?token=${token}`)
    }
);


module.exports = AdminRoute;

