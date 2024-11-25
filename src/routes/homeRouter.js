const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/authMiddleware');

/* router.get('/dashboard/stallowner/:seller_id', isLoggedIn, (req, res) => {
    if (req.user) {
        res.send(`Hello stall owner ${req.user.username}, welcome to StallMate! <a href="/dashboard/stallowner/${req.params.seller_id}/menu">Go to menu</a> <br>
            <a href="/dashboard/stallowner/${req.params.seller_id}/profile">Go to profile</a> <br> 
            <a href="/dashboard/stallowner/${req.params.seller_id}/orders/pending">Go to orders pending page</a> <br>
            <a href="/dashboard/stallowner/${req.params.seller_id}/orders/completed">Go to orders completed page</a>`);

    } else {
        res.redirect('/auth/stallowner/google');
    }
});

router.get('/dashboard/customer/:customer_id', isLoggedIn, (req, res) => {
    if (req.user) {
        res.send(`Hello customer ${req.user.username}, welcome to StallMate!! <br>
            <a href="/dashboard/customer/${req.params.customer_id}/history">Go to order history</a> <br>
            <a href="/dashboard/customer/${req.params.customer_id}/favorite">Go to favorite stalls</a> <br>
            <a href="/dashboard/customer/${req.params.customer_id}/profile">Profile link</a>
            `);
    } else {
        res.redirect('/auth/customer/google');
    }
}); */

router.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'development') {
        res.send(`
            <a href="/auth/stallowner/google">Authenticate as Stall Owner with Google </a> <br> 
            <a href="/auth/customer/google">Authenticate as Customer with Google </a>
        `);
    } else {
        res.status(403).json({ error: 'Access forbidden in production mode.' });
    }
});

router.get('/dashboard/stallowner', isLoggedIn, (req, res) => {
    if (req.user && req.user.userType === 'StallOwner') {
        res.json({ userType: req.user.userType, ownerID: req.user._id, ownerName: req.user.username });
    } else {
        res.status(401).json({ error: 'Unauthorized access.' });
    }
});

router.get('/dashboard/customer', isLoggedIn, (req, res) => {
    if (req.user && req.user.userType === 'Customer') {
        res.json({ userType: req.user.userType, clientID: req.user._id, clientName: req.user.username });
    } else {
        res.status(401).json({ error: 'Unauthorized access.' });
    }
});

module.exports = router;