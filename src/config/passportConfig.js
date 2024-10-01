const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    app.use(session ({
        secret: 'sessionStallMate',
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}