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
    // callbackURL: "https://stall-mate.vercel.app/auth/stallowner/google/callback",
    callbackURL: "http://ec2-13-215-252-79.ap-southeast-1.compute.amazonaws.com:3000/auth/stallowner/google/callback",
    // callbackURL: "http://localhost:3000/auth/stallowner/google/callback",
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
  // callbackURL: "https://stall-mate.vercel.app/auth/customer/google/callback",
  callbackURL: "http://ec2-13-215-252-79.ap-southeast-1.compute.amazonaws.com:3000/auth/customer/google/callback",
  // callbackURL: "http://localhost:3000/auth/customer/google/callback",
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
  // console.log('Serializing User:', { id: user.id, userType });
  done(null, { id: user.id, userType });
});

passport.deserializeUser(async ({ id, userType }, done) => {
  try {
      console.log('Deserializing User with ID:', id, 'and UserType:', userType);


      const foundUser = userType === 'StallOwner'
          ? await User.findById(id)
          : await Customer.findById(id);

      if (!foundUser) {
          console.error('User not found in database during deserialization');
          return done(null, false); 
      }

      // console.log('Deserialized User:', foundUser);
      done(null, foundUser); // Attach the user object to req.user
  } catch (error) {
      console.error('Error during deserialization:', error);
      done(error, null);
  }
});

module.exports = passport;