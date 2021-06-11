import { NextFunction, Request, Response } from "express";
import SessionModel from '../models/Sessions';
import UserModel from '../models/Users';
import bcrypt from 'bcrypt';

class LoginController {
    // [GET] /login
    index(req: Request, res: Response) {
        res.render('login');
    }

    // [POST] /login
    async login(req: Request, res: Response) {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.render('error');
        }

        const userId = user._id;
        
        // Check multiple login from same user
        const arr = await SessionModel.find({lock: true});
        let isLoggedIn = arr.some((user: any, index: any) => {
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

export default new LoginController;