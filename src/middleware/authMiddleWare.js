function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }else{
        return res.status(401);
    }
}
module.exports = isLoggedIn;