module.exports = {
    requireAuth(req, res, next) {
        if (!req.signedCookies.users) {
            return res.redirect('/login');
        }

        return next();
    },
    notRequireAuth(req, res, next) {
        if (req.signedCookies.users) {
            return res.redirect('/');
        }

        return next();
    },
}
