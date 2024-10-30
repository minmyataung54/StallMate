const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();
const User = require('../models/userSchema'); 
const { generateAndSaveQRCode } = require('./qrCodeUtil');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      let existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        console.log('User already exists:', existingUser);
        return done(null, existingUser);
      } else {
        const newUser = new User({
          username: profile.displayName,
          googleID: profile.id
        });
        

        const qrCodeUrl = await generateAndSaveQRCode(newUser._id);

        const responseData = {
          userID: newUser._id,
          username: newUser.username, 
          qrCodeUrl: qrCodeUrl,
        };
        await newUser.save();
      console.log('New User Created:', newUser);
        return done(null, newUser);
        
      }
      
    } catch (err) {
      console.error('Error saving user to the database:', err);
      return done(err, false);
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
});

module.exports = passport;