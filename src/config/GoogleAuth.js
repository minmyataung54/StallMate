const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();
const User = require('../models/userSchema'); 
const Customer = require('../models/Customer_credential');
const { generateAndSaveQRCode } = require('./qrCodeUtil');

// Google Strategy for StallOwner
passport.use('google-stallowner', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://65ca-2001-fb1-2e-c624-315a-3b55-911c-778d.ngrok-free.app/auth/stallowner/google/callback",
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      let existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        console.log("User already exists", existingUser);
        return done(null, existingUser);
      } else {
        const newUser = new User({
          username: profile.displayName,
          googleID: profile.id
        });
        const qrCodeUrl = await generateAndSaveQRCode(newUser._id);
        newUser.qrcode_url = qrCodeUrl;
        await newUser.save();
        console.log("New user created", newUser);
        return done(null, newUser);
      }
    } catch (err) {
      return done(err, false);
    }
  }
));

// Google Strategy for Customer
passport.use('google-customer', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://65ca-2001-fb1-2e-c624-315a-3b55-911c-778d.ngrok-free.app/auth/customer/google/callback",
  passReqToCallback: true,
},
async (request, accessToken, refreshToken, profile, done) => {
  try {
    let existingUser = await Customer.findOne({ googleID: profile.id });
    if (existingUser) {
      console.log("Customer already exists", existingUser);
      return done(null, existingUser);
    } else {
      const newCustomer = new Customer({
        username: profile.displayName,
        googleID: profile.id
      });
      await newCustomer.save();
      console.log("New customer created", newCustomer);
      return done(null, newCustomer);
    }
  } catch (err) {
    return done(err, false);
  }
}
));


passport.serializeUser((user, done) => {
  const userType = user instanceof User ? 'StallOwner' : 'Customer';
  done(null, { id: user.id, userType });
});


passport.deserializeUser(async (user, done) => {
  const { id, userType } = user;
  try {
    const foundUser = userType === 'StallOwner'
      ? await User.findById(id)
      : await Customer.findById(id);
    done(null, foundUser);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;