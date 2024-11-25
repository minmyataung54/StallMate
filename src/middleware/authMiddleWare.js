function isLoggedIn(req, res, next) {
	const isAuthenticated = req.isAuthenticated();
	// console.log(`[Auth Middleware] User authenticated: ${isAuthenticated}`);

	if (isAuthenticated) {
		if (req.session?.passport?.user?.userType) {
			req.user.userType = req.session.passport.user.userType;
			// console.log(`[Auth Middleware] UserType attached to req.user: ${req.user.userType}`);
		} else {
			console.warn(`[Auth Middleware] No userType found in session`);
		}
		return next();
	} else {
		// console.warn('[Auth Middleware] Access denied: user is not authenticated');
		return res.status(401).json({ error: 'Unauthorized access.' });
	}
}

module.exports = isLoggedIn;