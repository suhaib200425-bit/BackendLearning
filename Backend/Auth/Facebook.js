
const db = require('../DB/db');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK,
    profileFields: ['id', 'emails', 'name', 'picture.type(large)']
}, function (accessToken, refreshToken, profile, callback) {

    const email = profile.email
    const username =profile.first_name+' '+profile.last_name

    db.query('SELECT id,username,email FROM admins WHERE email = ?', [profile.emails[0].value], async (err, result) => {
        if (err) return callback(err, null)
        if (result.length === 0) {
            db.query('INSERT INTO admins ( username, email) VALUES (?,?)', [username, email], async (err2, result2) => {
                if (err2) return callback(err2, null)
                db.query('SELECT id,username,email FROM admins WHERE email = ?', [email], async (err3, result3) => {

                    return callback(null, result3[0])
                })


            })
        } else return callback(null, result[0])
    })
}
));