const passport = require('passport');
const session = require('express-session');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};