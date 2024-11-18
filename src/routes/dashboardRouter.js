const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/authMiddleware.js');

// Stall Owner Dashboard Route
router.get('/stallowner/:seller_id', isLoggedIn, (req, res) => {
    if (req.user) {
        res.send(`Hello stallowner ${req.user.username}, welcome to StallMate! <a href=/stallowner/${req.params.seller_id}/menu>Go to menu</a>`);
    } else {
        res.redirect('/auth/stallowner/google');
    }
});

// Customer Dashboard Route
router.get('/customer/:customer_id', isLoggedIn, (req, res) => {
    if (req.user) {
        res.send(`Hello customer ${req.user.username}, welcome to StallMate!`);
    } else {
        res.redirect('/auth/customer/google');
    }
});

module.exports = router;