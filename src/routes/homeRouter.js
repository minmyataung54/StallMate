const express = require('express');
const router = express.Router();


function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }else{
        return res.status(401);
    }
}
module.exports = isLoggedIn;
router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get('/protected/:id', isLoggedIn, (req, res) => {
    if (req.user) {
        res.send(`Hello, ${req.user.username}, Welcome from StallMate !`);
    } else {
        res.redirect('/auth/google'); 
    }
});


module.exports = router;