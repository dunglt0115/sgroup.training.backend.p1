const User = require('../models/Users');
const bcrypt = require('bcrypt');

class LoginController {
    // [GET] /login
    index(req, res) {
        res.render('login');
    }

    // [POST] /login
    async login(req, res) {
        const user = await User.findOne({email: req.body.email});

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.render('error');
        }

        // Tạo cookie
        res.cookie('users', user._id, {
            signed: true,
            maxAge: 24 * 60 * 60,
            httpOnly: true,
        });
        
        return res.redirect('/');
    }
}

module.exports = new LoginController;
