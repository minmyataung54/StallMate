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

router.get('/customer/google', setRedirectTo, (req, res, next) => {
        const options = {
            scope: ['email', 'profile'],
            state: Buffer.from(req.query.redirectTo || '').toString('base64') // Encode redirect URL in state
        };
        passport.authenticate('google-customer', options)(req, res, next);
    }
);

router.get('/customer/google/callback', passport.authenticate('google-customer', { failureRedirect: '/auth/failure?user=customer' }), (req, res) => {
        console.log('Callback Session:', req.session);
        let stateRedirect;
        if (req.query.state) {
            try {
                stateRedirect = Buffer.from(req.query.state, 'base64').toString();
            } catch (err) {
                console.error('Error decoding state:', err);
            }
        }

        // Store customerID in the session
        req.session.customerID = req.user._id; // Assuming req.user._id is the customer's ID
        console.log('Stored customerID in session:', req.session.customerID);

        // Determine redirect path with fallbacks
        const redirectTo = req.session.redirectTo || stateRedirect || '/dashboard/customer';

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

router.get('/stallowner/google/callback', passport.authenticate('google-stallowner', { failureRedirect: '/auth/failure?user=stallowner' }), (req, res) => {
        console.log('Authenticated User in Callback:', req.user);
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
            }
            res.redirect(`${process.env.FRONT_END_BASE_URL}/ownerStallProfile`);
        });
    }
);

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
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json({ message: 'Logout successful' });
        });
    });
});

module.exports = router;