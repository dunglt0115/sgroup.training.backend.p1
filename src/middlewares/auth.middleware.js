const UserModel = require('../app/models/Users');

module.exports = {
    async requireAuth(req, res, next) {
        if (!req.signedCookies.user) {
            return res.redirect('/login');
        }

        return next();
    },
    notRequireAuth(req, res, next) {
        if (req.signedCookies.user) {
            return res.redirect('/');
        }

        return next();
    },
}
