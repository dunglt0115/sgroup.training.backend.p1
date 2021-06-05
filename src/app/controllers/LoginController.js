const UserModel = require('../models/Users');
const SessionModel = require('../models/Sessions');
const bcrypt = require('bcrypt');

class LoginController {
    // [GET] /login
    index(req, res) {
        res.render('login');
    }

    // [POST] /login
    async login(req, res) {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.render('error');
        }

        const userId = user._id;
        
        // Check multiple login from same user
        const arr = await SessionModel.find({lock: true});
        let isLoggedIn = arr.some((user, index) => {
            return arr[index].user == userId;
        });
        if (isLoggedIn == true) {
            return res.render('error');
        }

        // Add new session to database and create cookie
        const session = await SessionModel.create({user: userId, lock: true});
        res.cookie('user', session._id, {
            signed: true,
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        
        return res.redirect('/');
    }
}

module.exports = new LoginController;
