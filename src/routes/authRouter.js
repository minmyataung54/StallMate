const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/stallowner/google', passport.authenticate('google-stallowner', { scope: ['email', 'profile'] }));

router.get('/customer/google', passport.authenticate('google-customer', { scope: ['email', 'profile'] }));

router.get('/stallowner/google/callback', 
    passport.authenticate('google-stallowner', {
        failureRedirect: '/auth/failure?user=stallowner'
    }), (req, res) => {
    res.redirect(`/dashboard/stallowner/${req.user._id}`);
});

router.get('/customer/google/callback', 
    passport.authenticate('google-customer', {
        failureRedirect: '/auth/failure?user=customer'
    }), (req, res) => {
    res.redirect(`/dashboard/customer/${req.user._id}`);
});

router.get('/failure', (req, res) => {
    const userType = req.query.user;
    if (userType === "stallowner") {
        res.redirect('/auth/stallowner/google');
    } else if (userType === "customer") {
        res.redirect('/auth/customer/google');
    } else {
        res.redirect('/');
    }
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