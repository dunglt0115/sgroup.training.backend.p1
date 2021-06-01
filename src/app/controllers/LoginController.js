const User = require('../models/Users');
const bcrypt = require('bcrypt');

class LoginController {
    // [GET] /login
    index(req, res) {
        res.render('login');
    }

    // [POST] /login
    async login(req, res) {
        const user = await User.findOne({
            email: req.body.email,
        })

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.render('error');
        }

        const userInformation = {
            id: user.id,
            email: user.email,
        }
        
        res.cookie('users', userInformation, {
            maxAge: 9000000,
            httpOnly: true,
            signed: true,
        });
        return res.redirect('/');
    }
}

module.exports = new LoginController;
