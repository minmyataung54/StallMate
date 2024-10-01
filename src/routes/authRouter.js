const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',passport.authenticate('google', { scope: ['email', 'profile']}));

router.get('/google/callback', passport.authenticate('google',{
    successRedirect: '/protected',
    failureRedirect: '/google/failure'
}));

router.get('/google/failure', (req,res) => {
    res.send('Failure to authenticate.');
});

// router.get('/logout', (req,res,next) => {
//     req.logout();
//     req.session.destroy();
//     res.send('GoodBye!');
// });
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Pass any error to the next middleware
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.redirect('/'); // Redirect to homepage or login page
        });
    });
});
module.exports = router;
