function isLoggedIn(req, res, next) {
    console.log('User is authenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log('Redirecting to home because user is not authenticated');
        return res.redirect('/');
    }
}

module.exports = isLoggedIn;