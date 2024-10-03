const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',passport.authenticate('google', { scope: ['email', 'profile']}));

router.get('/google/callback', passport.authenticate('google',{
    failureRedirect: '/google/failure'
}), (req,res) => {
    res.redirect(`/protected/${req.user._id}`);
});

router.get('/google/failure', (req,res) => {
    res.send('Failure to authenticate.');
});


router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
});
module.exports = router;
