const passport = require('passport');
const db = require('../DB/db');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALL_BACK,
  passReqToCallback: true
},
  function (req, accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    try {
      const email = profile.emails[0].value
      const username = profile.displayName
      db.query('SELECT id,username,email FROM admins WHERE email = ?', [profile.emails[0].value], async (err, result) => {
        if (err) return cb(err, null)
        if (result.length === 0) {
          db.query('INSERT INTO admins ( username, email) VALUES (?,?)', [username, email], async (err2, result2) => {
            if (err2) return cb(err2, null)
            db.query('SELECT id,username,email FROM admins WHERE email = ?', [email], async (err3, result3) => {

              return cb(null, result3[0])
            })


          })
        } else return cb(null, result[0])
      })


      // MUST always call cb()
    } catch (error) {
      return cb(error, null);
    }


  }
));

