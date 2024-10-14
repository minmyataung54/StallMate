const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    app.use(session ({
        secret: 'sessionStallMate',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 60 * 1000  
          }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}