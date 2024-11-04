const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/authMiddleWare.js');

// function isLoggedIn(req,res,next) {
//     if (req.isAuthenticated()){
//         return next();
//     }else{
//         return res.redirect('/');
//     }
// }
// module.exports = isLoggedIn;
router.get('/', (req, res) => {
    res.send(`
        <a href="/auth/stallowner/google">Authenticate as Stall Owner with Google </a> <br>
        <a href="/auth/customer/google">Authenticate as Customer with Google </a>`);
});

router.get('/dashboard/stallowner/:seller_id', isLoggedIn, (req, res) => {
    if (req.user) {
        res.send(`Hello stall owner ${req.user.username}, welcome to StallMate! <a href="/dashboard/stallowner/${req.params.seller_id}/menu">Go to menu</a> <br>
            <a href="/dashboard/stallowner/${req.params.seller_id}/profile">Go to profile</a>`);

    } else {
        res.redirect('/auth/stallowner/google');
    }
});


router.get('/dashboard/customer/:customer_id', isLoggedIn, (req, res) => {
    if (req.user) {
        res.send(`Hello customer ${req.user.username}, welcome to StallMate!`);
    } else {
        res.redirect('/auth/customer/google');
    }
});


module.exports = router;