const express = require('express');
const passport = require('passport');
const router = express.Router();

function setRedirectTo(req, res, next) {
    if (req.query.redirectTo) {
        req.session.redirectTo = req.query.redirectTo;
        console.log('Setting redirectTo in session:', req.session.redirectTo);
        
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
                return next(err);
            }
            console.log('Session saved successfully');
            next();
        });
    } else {
        next();
    }
}

router.get('/stallowner/google', passport.authenticate('google-stallowner', { scope: ['email', 'profile'] }));
router.get('/customer/google', 
    setRedirectTo,
    (req, res, next) => {
        const options = {
            scope: ['email', 'profile'],
            state: Buffer.from(req.query.redirectTo || '').toString('base64') // Encode redirect URL in state
        };
        passport.authenticate('google-customer', options)(req, res, next);
    }
);

router.get('/customer/google/callback', 
    passport.authenticate('google-customer', {
        failureRedirect: '/auth/failure?user=customer'
    }), 
    (req, res) => {
        console.log('Callback Session:', req.session);
        
        
        let stateRedirect;
        if (req.query.state) {
            try {
                stateRedirect = Buffer.from(req.query.state, 'base64').toString();
            } catch (err) {
                console.error('Error decoding state:', err);
            }
        }

        // Determine redirect path with fallbacks
        const redirectTo = req.session.redirectTo || 
                         stateRedirect || 
                         `/dashboard/customer/${req.user._id}`;

        console.log('Final redirect path:', redirectTo);
        
        // Clear the redirect URL from session
        delete req.session.redirectTo;
        
        // Save session before redirect
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
                // Redirect anyway, even if session save fails
            }
            res.redirect(redirectTo);
        });
    }
);

// Google callback for stall owner
router.get('/stallowner/google/callback', 
    passport.authenticate('google-stallowner', {
        failureRedirect: '/auth/failure?user=stallowner'
    }), (req, res) => {
    res.redirect(`/dashboard/stallowner/${req.user._id}`);
});

// router.get('/customer/google/callback', 
//     passport.authenticate('google-customer', {
//         failureRedirect: '/auth/failure?user=customer'
//     }), (req, res) => {
//     // Use the redirect URL if it exists in session, otherwise go to default dashboard
//     console.log('Redirecting to:', req.session.redirectTo);
//     const redirectTo = req.session.redirectTo || `/dashboard/customer/${req.user._id}`;
//     delete req.session.redirectTo; // Clear the session variable
//     res.redirect(redirectTo);
// });

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